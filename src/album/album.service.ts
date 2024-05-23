import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
    });
    return albums;
  }
}
