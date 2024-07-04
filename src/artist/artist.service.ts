import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistSelect } from './select';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtistBySpotifyId(spotifyId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        spotifyArtistId: spotifyId,
      },
      select: ArtistSelect,
    });
    return artist;
  }

  async createManyArtists(artists: Prisma.ArtistCreateInput[]) {
    await this.prisma.artist.createMany({
      data: artists,
    });
  }
}
