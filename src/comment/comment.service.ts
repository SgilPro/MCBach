import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDao, CommentVo } from './dao';
import { CommentSelect } from './select';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  private transformComment = (comment: CommentVo): CommentDao => {
    const firstName = comment.user.firstName ?? '';
    const lastName = comment.user.lastName ?? '';
    const space = firstName && lastName ? ' ' : '';
    const newComment = {
      ...comment,
      likesCount: comment._count.likes,
      name:
        firstName || lastName
          ? `${firstName}${space}${lastName}`
          : '❓Anonymous❓',
    };
    delete newComment._count;
    delete newComment.user;
    return newComment;
  };

  async getTopComments(count: number) {
    const comments = await this.prisma.comment.findMany({
      take: count,
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      select: CommentSelect,
    });
    return comments.map(this.transformComment);
  }

  async getCommentsByAlbumId(albumId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        albumId: albumId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: CommentSelect,
    });
    return comments.map(this.transformComment);
  }

  async createComment(userId: number, albumId: number, content: string) {
    return await this.prisma.comment.create({
      data: {
        userId: userId,
        albumId: albumId,
        content: content,
      },
    });
  }
}
