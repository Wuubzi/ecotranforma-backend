import { actividadesDTO } from './dto/actividadesDTO';
import { voluntarioDTO } from './dto/voluntarioDTO';
import { LandingService } from './landing.service';
import { Body, Controller, Post, Get } from '@nestjs/common';

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Post('voluntarios')
  voluntarios(@Body() dto: voluntarioDTO) {
    return this.landingService.voluntarios(dto);
  }

  @Get('voluntarios')
  get_voluntarios() {
    return this.landingService.get_voluntarios();
  }

  @Post('actividades')
  actividades(@Body() dto: actividadesDTO) {
    return this.landingService.actividades(dto);
  }

  @Get('actividades')
  get_actividades() {
    return this.landingService.get_actividades();
  }
}
