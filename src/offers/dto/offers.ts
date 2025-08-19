import { IsNotEmpty } from 'class-validator';

export class OfferDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  cost: number;
  @IsNotEmpty()
  category: string;
}
