import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Module({
  providers: [ArtistService],
})
export class ArtistModule {}
