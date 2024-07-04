import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlbumSelect } from './select';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getNewReleases(limit: number, offset: number) {
    const albums = await this.prisma.album.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        releaseAt: 'asc',
      },
      select: AlbumSelect,
    });
    return albums;
  }

  async getAlbumsBySpotifyId(spotifyId: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        spotifyAlbumId: spotifyId,
      },
      select: AlbumSelect,
    });
    return album;
  }

  async createManyAlbums(albums: Prisma.AlbumCreateInput[]) {
    await this.prisma.album.createMany({
      data: albums,
    });
  }
}
