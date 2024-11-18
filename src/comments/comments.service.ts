import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private postsService: PostsService,
  ) {}
  async create(postId: number, createCommentDto: CreateCommentDto, authorIp: string) {
    const newComment = this.commentRepository.create(createCommentDto);
    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new NotFoundException('Post with such id does not exist');
    }
    newComment.post = post;
    newComment.author_ip = authorIp;
    return this.commentRepository.save(newComment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
    });
  }

  async countRating(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['votes'],
    });
    if (!comment) {
      throw new NotFoundException('Comment with such id does not exist');
    }
    return comment.votes.reduce((sum, vote) => sum + vote.value, 0);
  }
}
