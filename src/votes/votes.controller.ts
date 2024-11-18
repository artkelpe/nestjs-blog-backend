import { Controller, Post, Body, Param, Ip } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CommentsService } from '../comments/comments.service';

@Controller('posts/:postId/comments/:commentId/votes')
export class VotesController {
  constructor(
    private readonly votesService: VotesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  async create(
    @Param('postId') postId: number,
    @Param('commentId') commentId: number,
    @Body() createVoteDto: CreateVoteDto,
    @Ip() ip: string,
  ) {
    await this.votesService.processVote(postId, commentId, createVoteDto, ip);
    return { newRating: await this.commentsService.countRating(commentId) };
  }
}
