/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=(?:.*\d){2,}).*$/, {
    message: 'La contraseña debe tener al menos una mayúscula y dos números',
  })
  @MaxLength(24)
  password: string;
}
