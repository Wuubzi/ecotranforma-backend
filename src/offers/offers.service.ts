/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OfferDTO } from './dto/offers';
import { InjectModel } from '@nestjs/sequelize';
import { offers } from './models/ofertas';
import { User } from 'src/users/models/User';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(offers) private offersModel: typeof offers,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async get_offers() {
    return await this.offersModel.findAll();
  }

  async get_offer(id_offer: number) {
    const oferta = await this.offersModel.findOne({
      where: { id_offer: id_offer },
    });

    if (!oferta) throw new NotFoundException('La oferta no existe');

    return oferta;
  }

  async redeem_offer(id_offer: number, id_user: number) {
    const user = await this.userModel.findOne({ where: { id_user: id_user } });
    if (!user) throw new NotFoundException('Este usuario no existe');

    const offer = await this.offersModel.findOne({
      where: { id_offer: id_offer },
    });
    if (!offer) throw new NotFoundException('Esta oferta no existe');

    if (user.dataValues.points < offer.dataValues.cost)
      throw new BadRequestException(
        'No tienes puntos suficientes para canjear esta oferta',
      );
    const rest_points = user.dataValues.points - offer.dataValues.cost;
    await user.update({ points: rest_points });

    return {
      message: 'La Oferta fue reclamada con exito',
      code: '200',
    };
  }

  async add_offer(data: OfferDTO) {
    const offer = await this.offersModel.findOne({
      where: { name: data.name },
    });

    if (offer) throw new BadRequestException('Esta oferta ya existe');

    await this.offersModel.create({
      name: data.name,
      description: data.description,
      cost: data.cost,
      category: data.category,
    } as any);
    return {
      message: 'Oferta agregada correctamente',
      code: '200',
    };
  }
}
