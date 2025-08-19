import { Module } from '@nestjs/common';
import { LandingController } from './landing.controller';
import { LandingService } from './landing.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { voluntarios } from './models/voluntarios';
import { actividades } from './models/actividades';

@Module({
  imports: [SequelizeModule.forFeature([voluntarios, actividades])],
  controllers: [LandingController],
  providers: [LandingService],
})
export class LandingModule {}
