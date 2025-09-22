import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { offers } from './models/ofertas';
import { User } from 'src/users/models/User';
import { UserRedeemedOffers } from './models/redeem_oferta';

@Module({
  imports: [SequelizeModule.forFeature([User, offers, UserRedeemedOffers])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
