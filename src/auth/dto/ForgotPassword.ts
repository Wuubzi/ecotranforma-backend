/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPassword {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
