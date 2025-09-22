import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { OfferDTO } from './dto/offers';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Get('get-offers')
  get_offers(@Query('id_user') id_user: number) {
    return this.offersService.get_offers(id_user);
  }

  @Get('get-all-offers')
  get_all_offers() {
    return this.offersService.get_all_offers();
  }

  @Get('get-offers-redeem')
  get_offers_redeem(@Query('id_user') id_user: number) {
    return this.offersService.get_user_redeemed_offers(id_user);
  }

  @Get('get-offer')
  get_offer(@Query('id_offer') id_offer: number) {
    return this.offersService.get_offer(id_offer);
  }

  @Put('redeem-offer')
  redeem_offers(
    @Query('id_offer') id_offer: number,
    @Query('id_user') id_user: number,
  ) {
    return this.offersService.redeem_offer(id_offer, id_user);
  }

  @Post('add-offers')
  add_offer(@Body() dto: OfferDTO) {
    return this.offersService.add_offer(dto);
  }

  @Delete('delete-offer')
  delete_offer(@Query('id_offer') id_offer: number) {
    return this.offersService.delete_offer(id_offer);
  }
}
