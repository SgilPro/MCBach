import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { SpotifyService } from 'src/spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AlbumController],
  providers: [AlbumService, SpotifyService],
})
export class AlbumModule {}
