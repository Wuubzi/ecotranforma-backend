import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OfferDTO } from './dto/offers';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Get('get-offers')
  get_offers() {
    return this.offersService.get_offers();
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
}
