import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateRecolectionDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  fecha?: string;

  @IsOptional()
  @IsString()
  hora?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
