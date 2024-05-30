import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SpotifyService],
})
export class SpotifyModule {}
