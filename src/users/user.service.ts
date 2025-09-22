import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './models/User';

import { InjectModel } from '@nestjs/sequelize';
import { UpdateUser } from './DTO/update-user.dto';

@Injectable()
export class UserService {
  cloudinaryService: any;
  userService: any;
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async get_user(id_user: number) {
    const user = await this.userModel.findOne({ where: { id_user } });
    return user;
  }

  async get_users() {
    const users = await this.userModel.findAll();
    return users;
  }

  async update_user(id_user: number, data: UpdateUser) {
    const user = await this.userModel.findOne({ where: { id_user } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      // Actualizar usuario con los valores proporcionados
      await user.update({
        name: data.name,
        email: data.email,
      });

      // Retornar el usuario actualizado
      return {
        message: 'Usuario Actualizado Correctamente',
        code: 200,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al actualizar usuario');
    }
  }
}
