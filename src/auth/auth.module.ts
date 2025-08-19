import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/User';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/Mails/Emails.service';
import { CacheService } from 'src/Redis/cache.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        '6a88ef0b17f4d4370abf3a5d64f1b41c76f4e9ac6b64fba1c1c7c9b0cb92a1f0b7a017c6e11b3726a8a6b1ff6c4c49dbfd6cb16c9c0bc6cdbaac3495e663b8e2',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, CacheService],
})
export class AuthModule {}
