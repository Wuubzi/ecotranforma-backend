import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user')
  get_user(@Query('id_user') id_user: number) {
    return this.userService.get_user(id_user);
  }
}
