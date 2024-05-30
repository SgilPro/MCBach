import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class SpotifyService {
  private accessToken: string;
  private readonly spotifyBaseUrl = 'https://api.spotify.com/v1';
  private readonly spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async getToken() {
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
    return data;
  }

  async getNewReleases(limit: number, offset: number) {
    return await this.httpService.get(
      `${this.spotifyBaseUrl}/browse/new-releases?offset=${offset}&limit=${limit}`,
    );
  }
}
