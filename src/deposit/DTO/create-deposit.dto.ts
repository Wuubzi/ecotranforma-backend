import { IsInt, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class DetailItemDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsInt()
  quantity: number;

  @IsInt()
  totalValue: number;
}

export class CreateDepositDto {
  @IsInt()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailItemDto)
  details: DetailItemDto[];
}
