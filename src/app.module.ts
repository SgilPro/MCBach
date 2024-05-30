import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { SpotifyModule } from './spotify/spotify.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AlbumModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    CommentModule,
    SpotifyModule,
  ],
})
export class AppModule {}
