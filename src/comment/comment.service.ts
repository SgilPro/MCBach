import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDao, CommentVo } from './dao';
import { CommentSelect } from './select';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      where: { isDeleted: false },
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
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: CommentSelect,
    });
    return comments.map(this.transformComment);
  }

  async getCommentById(commentId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        id: commentId,
        isDeleted: false,
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

  async editComment(userId: number, commentId: number, content: string) {
    try {
      return await this.prisma.comment.update({
        where: { id: commentId, userId: userId, isDeleted: false },
        data: {
          content: content,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Comment not found');
        }
      }
      throw error;
    }
  }

  async deleteComment(userId: number, commentId: number) {
    try {
      return await this.prisma.comment.update({
        where: { id: commentId, userId: userId, isDeleted: false },
        data: {
          isDeleted: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Comment not found');
        }
      }
      throw error;
    }
  }
}
