import { CommentService } from './comment.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCommentDto, GetCommentsDto, GetTopCommentsDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';

@Controller()
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('comments/top')
  getTopComments(@Query() dto: GetTopCommentsDto) {
    return this.commentService.getTopComments(dto.count);
  }

  @Get('comments')
  getCommentsByAlbum(@Query() dto: GetCommentsDto) {
    return this.commentService.getCommentsByAlbumId(dto.albumId);
  }

  @UseGuards(JwtGuard)
  @Post('comment')
  createComment(@GetUser() user: User, @Body() dto: CreateCommentDto) {
    return this.commentService.createComment(user.id, dto.albumId, dto.content);
  }
}
