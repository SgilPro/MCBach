import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCommentDto,
  EditCommentDto,
  GetCommentsDto,
  GetTopCommentsDto,
} from './dto';
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

  @Get('comment/:id')
  getCommentById(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentService.getCommentById(id);
  }

  @UseGuards(JwtGuard)
  @Post('comment')
  createComment(@GetUser() user: User, @Body() dto: CreateCommentDto) {
    return this.commentService.createComment(user.id, dto.albumId, dto.content);
  }

  @UseGuards(JwtGuard)
  @Patch('comment/:id')
  editComment(
    @GetUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: EditCommentDto,
  ) {
    return this.commentService.editComment(user.id, id, dto.content);
  }

  @UseGuards(JwtGuard)
  @Delete('comment/:id')
  deleteComment(
    @GetUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.commentService.deleteComment(user.id, id);
  }
}
