import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser } from './DTO/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user')
  get_user(@Query('id_user') id_user: number) {
    return this.userService.get_user(id_user);
  }

  @Get('get-users')
  get_users() {
    return this.userService.get_users();
  }

  @Put('update-user')
  update_user(@Query('id_user') id_user: number, @Body() data: UpdateUser) {
    return this.userService.update_user(id_user, data);
  }
}
