import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':token/:page')
  async findAll(@Param('token') token: string, @Param('page') page: number) {
    return await this.userService.findAll(token, page);
  }

  @Get('detail/:name/:token')
  async findOne(@Param('name') name: string, @Param('token') token: string) {
    return await this.userService.findOne(name, token);
  }

  @Get('repos/:name/:token')
  async findRepos(@Param('name') name: string, @Param('token') token: string) {
    return await this.userService.findRepos(name, token);
  }
}
