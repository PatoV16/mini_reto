import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GithubUserResponse } from './interfces/github-user.interface';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockGithubUser: GithubUserResponse = {
    username: 'torvalds',
    name: 'Linus Torvalds',
    bio: null,
    avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    publicRepos: 8,
    followers: 250000,
    following: 0,
    location: 'Portland, OR',
    company: null,
    blog: '',
    twitterUsername: null,
    githubUrl: 'https://github.com/torvalds',
    createdAt: '2011-09-03T15:26:22Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getGithubUser: jest.fn().mockResolvedValue(mockGithubUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver los datos del usuario de GitHub', async () => {
    const result = await controller.getUser('torvalds');
    expect(result).toEqual(mockGithubUser);
    expect(service.getGithubUser).toHaveBeenCalledWith('torvalds');
  });
});