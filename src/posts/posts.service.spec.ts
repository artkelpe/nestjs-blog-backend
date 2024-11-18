import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

const postToCreate = new Post('post 4', 'perex for post 4', 'content for post 4', []);
const postsArray = [
  new Post('post 1', 'perex for post 1', 'content for post 1', []),
  new Post('post 2', 'perex for post 2', 'content for post 2', []),
  new Post('post 3', 'perex for post 3', 'content for post 3', []),
];

describe('PostsService', () => {
  let service: PostsService;
  let repo: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn().mockResolvedValue(postsArray),
            findOne: jest.fn().mockResolvedValue(postsArray[1]),
            findOneOrFail: jest.fn().mockResolvedValue(postsArray[1]),
            create: jest.fn().mockReturnValue(postToCreate),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repo = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const posts = await service.findAll();
      expect(posts).toEqual(postsArray);
    });
  });

  describe('findOne', () => {
    it('should get a single post', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.findOne(2)).resolves.toEqual(postsArray[1]);
      expect(repoSpy).toHaveBeenCalledWith({ where: { id: 2 }, relations: ['comments', 'comments.votes'] });
    });
  });

  describe('createOne', () => {
    it('should successfully insert a post', () => {
      expect(
        service.create({
          title: postToCreate.title,
          perex: postToCreate.perex,
          content: postToCreate.content,
        }),
      ).resolves.toEqual(postToCreate);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        title: postToCreate.title,
        perex: postToCreate.perex,
        content: postToCreate.content,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const post = await service.update(2, {
        title: postsArray[1].title + 'suffix',
        perex: postsArray[1].perex,
        content: postsArray[1].content,
      });
      expect(post).toEqual(postsArray[1]);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(2, {
        title: postsArray[1].title + 'suffix',
        perex: postsArray[1].perex,
        content: postsArray[1].content,
      });
    });
  });

  describe('removeOne', () => {
    it('should return true', () => {
      expect(service.remove(1)).resolves.toEqual(true);
    });
  });
});
