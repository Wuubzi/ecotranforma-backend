import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './DTO/create-deposit.dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get('get-deposits')
  get_deposits(@Query('id_user') id_user: number) {
    return this.depositService.get_deposits(id_user);
  }

  @Get('get-deposit')
  get_deposit(@Query('id_deposit') id_deposit: number) {
    return this.depositService.get_deposit(id_deposit);
  }
  @Post('add-deposit')
  add_deposit(@Body() data: CreateDepositDto) {
    return this.depositService.createDeposit(data);
  }
}
