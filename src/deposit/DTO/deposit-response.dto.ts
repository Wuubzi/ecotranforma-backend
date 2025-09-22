import { DetailsDepositResponseDto } from './details-deposit-response.dto';

export class DepositResponseDto {
  id_deposit: number;
  createdAt: Date;
  details?: DetailsDepositResponseDto[];
}
