import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecolectionController } from './recolection.controller';
import { RecolectionService } from './recolection.service';
import { Recolection } from './models/Recolection';

@Module({
  imports: [SequelizeModule.forFeature([Recolection])],
  controllers: [RecolectionController],
  providers: [RecolectionService],
  exports: [RecolectionService],
})
export class RecolectionModule {}
