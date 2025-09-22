import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { Deposit } from './models/Deposit';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/User';
import { DetailsDeposit } from './models/DetailsDeposit';

@Module({
  imports: [SequelizeModule.forFeature([User, Deposit, DetailsDeposit])],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
