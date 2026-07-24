import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GithubUserResponse } from './interfces/github-user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly githubApiUrl = 'https://api.github.com/users';

  async getGithubUser(username: string): Promise<GithubUserResponse> {
    let response: Response;

    try {
      response = await fetch(`${this.githubApiUrl}/${username}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          // Opcional: agregar token para evitar rate limit bajo
          // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });
    } catch (error) {
      this.logger.error(`Error contactando la API de GitHub: ${error}`);
      throw new HttpException(
        'No se pudo contactar la API de GitHub',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    if (response.status === 404) {
      throw new NotFoundException(`El usuario "${username}" no existe en GitHub`);
    }

    if (!response.ok) {
      throw new HttpException(
        'Error consultando la API de GitHub',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const data = await response.json();

    return {
      username: data.login,
      name: data.name,
      bio: data.bio,
      avatarUrl: data.avatar_url,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      location: data.location,
      company: data.company,
      blog: data.blog,
      twitterUsername: data.twitter_username,
      githubUrl: data.html_url,
      createdAt: data.created_at,
    };
  }
}