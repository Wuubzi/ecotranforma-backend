/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './users/user.module';
import { LandingModule } from './landing/landing.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 300,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'wuubzi',
      password: 'Carlos31082005',
      database: 'ecotransforma',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    LandingModule,
    OffersModule,
  ],
})
export class AppModule {}
