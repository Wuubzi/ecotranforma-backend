/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthService } from './auth.service';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { Login } from './dto/login';
import { RegisterDTO } from './dto/register';
import { ForgotPassword } from './dto/ForgotPassword';
import { verifyCode } from './dto/verifyCode';
import { ChangePassword } from './dto/ChangePassword';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: Login) {
    const user = await this.authService.validateUser(dto);
    return this.authService.login(user);
  }
  @Post('login-admin')
  async loginAdmin(@Body() dto: Login) {
    const user = await this.authService.validateAdmin(dto);
    return this.authService.loginAdmin(user);
  }

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPassword) {
    return this.authService.forgotPassword(dto);
  }

  @Post('verify-code')
  VerifyCode(@Body() dto: verifyCode) {
    return this.authService.verifyCode(dto);
  }

  @Put('change-password')
  ChangePassword(@Body() dto: ChangePassword) {
    return this.authService.ChangePassword(dto);
  }
}
