import { AlbumService } from './../album/album.service';
import { HttpService } from '@nestjs/axios';
import { Cache } from '@nestjs/cache-manager';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class SpotifyService {
  private readonly spotifyBaseUrl = 'https://api.spotify.com/v1';
  private readonly spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
  private readonly logger = new Logger(SpotifyService.name);

  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private albumService: AlbumService,
    private cacheManager: Cache,
  ) {}

  private async renewToken() {
    const requestBody = new URLSearchParams({
      grant_type: 'client_credentials',
    });
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            this.config.get('SPOTIFY_CLIENT_ID') +
              ':' +
              this.config.get('SPOTIFY_CLIENT_SECRET'),
          ).toString('base64'),
      },
    };
    const { data } = await this.httpService.axiosRef.post(
      this.spotifyTokenUrl,
      requestBody,
      requestConfig,
    );
    await this.cacheManager.set(
      'accessToken',
      data['access_token'],
      this.config.get('SPOTIFY_TOKEN_REFRESH_SECONDS') * 1000, // 3600 seconds
    );
  }

  private async getNewReleases(limit: number, offset: number) {
    try {
      const retryTime = 3;
      let success = false;
      let data, authError;
      let accessToken = await this.cacheManager.get('accessToken');
      const requestUrl = `${this.spotifyBaseUrl}/browse/new-releases?offset=${offset}&limit=${limit}`;

      for (let i = 0; i < retryTime && !success; i++) {
        const requestConfig: AxiosRequestConfig = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        await this.httpService.axiosRef
          .get(requestUrl, requestConfig)
          .then((res) => {
            data = res.data;
            success = true;
            this.logger.log('Success to fetch data');
          })
          .catch(async (error) => {
            await this.renewToken();
            accessToken = await this.cacheManager.get('accessToken');
            authError = error;
            this.logger.warn('Failed to fetch data, trying to renew token');
          });
      }

      if (!success) throw authError;

      return data;
    } catch (error) {
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async getNewReleasesJob() {
    const limit: number = +this.config.get('SPOTIFY_NEW_RELEASES_LIMIT');
    const offset: number = +this.config.get('SPOTIFY_NEW_RELEASES_OFFSET');
    this.logger.debug(
      `[CronJob] Fetch New Releases with limit=${limit} and offset=${offset}`,
    );
    const res = await this.getNewReleases(limit, offset);
    // Guard clause for fields checking
    if (!res.albums) {
      this.logger.error('[CronJob] There are no albums in the response');
      return;
    }
    if (!res.albums.items) {
      this.logger.error('[CronJob] There are no items in the response.albums');
      return;
    }
    const albums: Prisma.AlbumCreateInput[] = [];

    for (const item of res.albums.items) {
      this.logger.debug('====================================================');
      this.logger.debug(`Now processing: <${item.name}>`);
      const album = await this.albumService.getAlbumsBySpotifyId(item.id);
      if (album) {
        this.logger.debug('This album is already in the database.');
      } else {
        this.logger.debug(`Not found! Store this album in the database later.`);
      }
    }
    const result = await this.albumService.createManyAlbums(albums);
    this.logger.debug(`Update result: ${result}`);
  }
}
