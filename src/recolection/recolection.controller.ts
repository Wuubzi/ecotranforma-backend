import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RecolectionService } from './recolection.service';
import { CreateRecolectionDto } from './DTO/create-recolection.dto';
import { UpdateRecolectionDto } from './DTO/update-recolection.dto';

@Controller('recolections')
export class RecolectionController {
  constructor(private readonly recolectionService: RecolectionService) {}

  @Get('user/:userId')
  get_recolections(@Param('userId', ParseIntPipe) userId: number) {
    return this.recolectionService.get_recolections(userId);
  }

  @Get('all')
  getAllRecolections() {
    return this.recolectionService.getAllRecolections();
  }

  @Get('stats')
  getRecolectionStats() {
    return this.recolectionService.getRecolectionStats();
  }

  @Get('status/:estado')
  getRecolectionsByStatus(@Param('estado') estado: string) {
    return this.recolectionService.getRecolectionsByStatus(estado);
  }

  @Get(':id')
  getRecolectionById(@Param('id', ParseIntPipe) id: number) {
    return this.recolectionService.getRecolectionById(id);
  }

  @Post('create')
  add_recoletion(@Body() data: CreateRecolectionDto) {
    return this.recolectionService.add_recoletion(data);
  }

  @Put(':id')
  updateRecolection(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRecolectionDto,
  ) {
    return this.recolectionService.updateRecolection(id, data);
  }

  @Delete(':id')
  deleteRecolection(@Param('id', ParseIntPipe) id: number) {
    return this.recolectionService.deleteRecolection(id);
  }
}
