import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver los datos mapeados del usuario', async () => {
    const mockResponse = {
      login: 'torvalds',
      name: 'Linus Torvalds',
      bio: null,
      avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
      public_repos: 8,
      followers: 250000,
      following: 0,
      location: 'Portland, OR',
      company: null,
      blog: '',
      twitter_username: null,
      html_url: 'https://github.com/torvalds',
      created_at: '2011-09-03T15:26:22Z',
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    }) as jest.Mock;

    const result = await service.getGithubUser('torvalds');

    expect(result.username).toBe('torvalds');
    expect(result.publicRepos).toBe(8);
  });

  it('debería lanzar NotFoundException si el usuario no existe', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }) as jest.Mock;

    await expect(service.getGithubUser('usuario-inexistente')).rejects.toThrow(
      NotFoundException,
    );
  });
});