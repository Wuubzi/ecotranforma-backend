/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Login } from './dto/login';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/User';
import { RegisterDTO } from './dto/register';
import { ForgotPassword } from './dto/ForgotPassword';
import { EmailService } from 'src/Mails/Emails.service';
import * as crypto from 'crypto';
import { CacheService } from 'src/Redis/cache.service';
import { verifyCode } from './dto/verifyCode';
import { ChangePassword } from './dto/ChangePassword';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    private cache: CacheService,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async validateUser(data: Login): Promise<any> {
    const { email, password } = data;

    if (!email || !password) {
      throw new UnauthorizedException('Correo y contraseña son requeridos');
    }

    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !user.dataValues.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { password: _, ...result } = user['dataValues'];
    return result;
  }

  login(data: User) {
    const payload = { sub: data.id_user, email: data.email };
    return {
      access_token: this.jwtService.sign(payload),
      data,
    };
  }

  async validateAdmin(data: Login): Promise<any> {
    const { email, password } = data;

    if (!email || !password) {
      throw new UnauthorizedException('Correo y contraseña son requeridos');
    }

    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !user.dataValues.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    if (user.dataValues.rol !== 'admin') {
      throw new UnauthorizedException('Acceso restringido a administradores');
    }

    const { password: _, ...result } = user['dataValues'];
    return result;
  }

  loginAdmin(data: User) {
    const payload = { sub: data.id_user, email: data.email, role: data.rol };
    return {
      access_token: this.jwtService.sign(payload),
      data,
    };
  }

  async register(data: RegisterDTO): Promise<User> {
    const isExisting = await this.userModel.findOne({
      where: { email: data.email },
    });
    if (isExisting) throw new ConflictException('Email ya esta en uso');

    const hash = await bcrypt.hash(data.password, 10);
    return this.userModel.create({
      name: data.name,
      email: data.email,
      password: hash,
    } as any);
  }

  async forgotPassword(data: ForgotPassword): Promise<any> {
    const user = await this.userModel.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('Este Correo Electronico no Existe');
    const code = crypto.randomInt(100000, 999999).toString();
    const CacheDTO = {
      clave: `codigo:${user.dataValues.email}`,
      valor: code,
    };

    await this.cache.saveToCache(CacheDTO);
    await this.emailService.sendMail(data.email, user.dataValues.name, code);
    return {
      message: 'El codigo fue enviado al correo',
      code: '200',
    };
  }

  async verifyCode(data: verifyCode): Promise<any> {
    const user = await this.userModel.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('Este Correo Electronico no Existe');

    const email = user.dataValues.email.toLowerCase().trim();
    const key = `codigo:${email}`;
    const code = await this.cache.getFromCache(key);

    if (code !== String(data.code)) {
      throw new BadRequestException('El codigo ingresado no es correcto');
    }

    await this.cache.deleteFromCache(key);
    const cacheDTO = {
      clave: `changePassword:${email}`,
      valor: 'true',
    };
    await this.cache.saveToCache(cacheDTO);
    return {
      message: 'Codigo Verificado correctamente',
      code: 200,
    };
  }

  async ChangePassword(data: ChangePassword) {
    const key = `changePassword:${data.email}`;
    const cache = await this.cache.getFromCache(key);
    if (!cache)
      throw new UnauthorizedException(
        'No estas autorizado para realizar esta accion',
      );

    const user = await this.userModel.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('Este Usuario no existe');

    const hash = await bcrypt.hash(data.password, 10);

    await user.update({ password: hash });

    return {
      message: 'Contraseña Actualizada Correctamente',
      code: '200',
    };
  }
}
