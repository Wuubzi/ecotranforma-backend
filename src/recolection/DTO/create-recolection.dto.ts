import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRecolectionDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
