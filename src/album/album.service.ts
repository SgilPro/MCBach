import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SpotifyService } from '../spotify/spotify.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    private spotifyService: SpotifyService,
  ) {}
  async getNewReleases(limit: number, offset: number) {
    const albums = await this.prisma.album.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        releaseAt: 'asc',
      },
    });
    return albums;
  }
}
