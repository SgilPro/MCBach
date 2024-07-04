import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { AlbumService } from 'src/album/album.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [SpotifyService, AlbumService],
})
export class SpotifyModule {}
