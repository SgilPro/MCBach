import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PrismaModule } from './prisma/prisma.module';
import { ControllerService } from './module/controller/controller.service';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AlbumModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CommentModule,
  ],
  providers: [ControllerService, CommentService],
  controllers: [CommentController],
})
export class AppModule {}
