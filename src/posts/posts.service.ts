import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(createPostDto);
    await this.postRepository.save(newPost);
    return newPost;
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.votes'],
    });
    if (post && post.comments) {
      // Calculate the rating for each comment
      post.comments = post.comments.map((comment) => {
        const rating = comment.votes.reduce((sum, vote) => sum + vote.value, 0);
        return {
          ...comment,
          rating,
        };
      });
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.postRepository.findOneOrFail({
      where: { id },
    });
    return this.postRepository.delete(id);
  }
}
