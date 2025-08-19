import { MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class voluntarioDTO {
  @IsNotEmpty()
  names: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  number_phone: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  time_disponibility: string;
  day_week: string[];
}
