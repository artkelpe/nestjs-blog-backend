import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    private commentsService: CommentsService,
  ) {}

  async processVote(postId: number, commentId: number, createVoteDto: CreateVoteDto, authorIp: string) {
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment with such id does not exist');
    }
    const vote = await this.voteRepository.findOne({
      relations: ['comment'],
      where: { comment: { id: comment.id }, author_ip: authorIp },
    });
    // if no vote from this user - store it
    if (!vote) {
      const newVote = this.voteRepository.create(createVoteDto);
      newVote.comment = comment;
      newVote.author_ip = authorIp;
      newVote.value = createVoteDto.value === 1 ? 1 : 0;
      await this.voteRepository.save(newVote);
    }
    // if there is vote from same user with same value - remove it
    else if (vote && vote.value === createVoteDto.value) {
      await this.voteRepository.delete(vote.id);
    }
    // if there is vote from same user with different value - change it to new one
    else if (vote && vote.value !== createVoteDto.value) {
      await this.voteRepository.update(vote.id, { value: createVoteDto.value });
    }
    return;
  }
}
