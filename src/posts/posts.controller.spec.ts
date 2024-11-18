import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            findAll: jest
              .fn()
              .mockReturnValue([
                new Post('post title 1', 'post perex 1', 'post content 1', [], 1),
                new Post('post title 2', 'post perex 2', 'post content 2', [], 2),
              ]),
            findOne: jest.fn().mockReturnValue(new Post('post title 1', 'post perex 1', 'post content 1', [], 1)),
            create: jest.fn().mockReturnValue(new Post('post title 3', 'post perex 3', 'post content 3', [], 3)),
            remove: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should get the list of posts', async () => {
      const posts = await controller.findAll();
      expect(typeof posts).toBe('object');
      expect(posts[0].id).toBe(1);
      expect(posts[0].perex).toBe('post perex 1');
      expect(posts[1].id).toBe(2);
      expect(posts[1].title).toBe('post title 2');
      expect(posts.length).toBe(2);
    });
  });
});
