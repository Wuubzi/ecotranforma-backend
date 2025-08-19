/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class ChangePassword {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=(?:.*\d){2,}).*$/, {
    message: 'La contraseña debe tener al menos una mayúscula y dos números',
  })
  @MaxLength(24)
  password: string;
}
