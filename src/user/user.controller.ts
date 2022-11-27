import { Controller, Get, Param, Headers, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query('since') since: number, @Headers() headers: any) {
    return await this.userService.findAll(since, headers.authorization);
  }

  @Get(':username/details')
  async findOne(@Param('username') username: string, @Headers() headers: any) {
    return await this.userService.findOne(username, headers.authorization);
  }

  @Get(':username/repos')
  async findRepos(
    @Param('username') username: string,
    @Headers() headers: any,
  ) {
    return await this.userService.findRepos(username, headers.authorization);
  }
}
