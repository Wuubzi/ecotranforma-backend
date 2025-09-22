import { IsString, IsEmail } from 'class-validator';

export class UpdateUser {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
