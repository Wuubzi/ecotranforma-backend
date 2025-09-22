import { DepositResponseDto } from './deposit-response.dto';

export class UserResponseDto {
  id_user: number;
  name: string;
  email: string;
  points: number;
  deposits?: DepositResponseDto[];
}
