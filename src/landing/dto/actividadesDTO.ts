import { MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class actividadesDTO {
  @IsNotEmpty()
  request_name: string;
  @IsNotEmpty()
  place_type: string;
  @IsNotEmpty()
  place_name: string;
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  request_contact: string;
  @IsEmail()
  @IsNotEmpty()
  request_email: string;
  @IsNotEmpty()
  request_address: string;
  @IsNotEmpty()
  activity_types: string;
}
