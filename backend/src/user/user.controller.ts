import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GithubUserResponse } from './interfces/github-user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(
    @Param('username') username: string,
  ): Promise<GithubUserResponse> {
    return this.userService.getGithubUser(username);
  }
}