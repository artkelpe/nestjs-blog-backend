import { Controller, Get, Post, Body, Param, Ip } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Param('postId') postId: number, @Body() createCommentDto: CreateCommentDto, @Ip() ip: string) {
    return this.commentsService.create(postId, createCommentDto, ip);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }
}
