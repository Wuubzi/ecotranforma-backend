import { Injectable } from '@nestjs/common';
import { User } from './models/User';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async get_user(id_user: number) {
    const user = await this.userModel.findOne({ where: { id_user } });
    return user;
  }
}
