/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { UserRedeemedOffers } from './models/redeem_oferta';
import { Op } from 'sequelize';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(offers) private offersModel: typeof offers,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(UserRedeemedOffers)
    private userRedeemedOffersModel: typeof UserRedeemedOffers,
  ) {}

  async get_offers(id_user: number) {
    // Obtener IDs de ofertas ya canjeadas por este usuario
    const redeemedOffers = await this.userRedeemedOffersModel.findAll({
      where: { id_user: id_user },
      attributes: ['id_offer'],
    });

    const redeemedOfferIds = redeemedOffers.map((ro) => ro.id_offer);

    // Obtener ofertas que NO han sido canjeadas por este usuario
    return await this.offersModel.findAll({
      where: {
        id_offer: {
          [Op.notIn]: redeemedOfferIds.length > 0 ? redeemedOfferIds : [0],
        },
      },
    });
  }

  async get_all_offers() {
    return await this.offersModel.findAll();
  }

  async get_offer(id_offer: number) {
    const oferta = await this.offersModel.findOne({
      where: { id_offer: id_offer },
    });

    if (!oferta) throw new NotFoundException('La oferta no existe');

    return oferta;
  }

  async get_user_redeemed_offers(id_user: number) {
    return await this.userRedeemedOffersModel.findAll({
      where: { id_user: id_user },
      include: [
        { model: offers, as: 'offer' },
        { model: User, as: 'user' },
      ],
      order: [['redeemed_at', 'DESC']],
    });
  }

  async delete_offer(id_offer: number) {
    return await this.offersModel.destroy({ where: { id_offer: id_offer } });
  }

  async redeem_offer(id_offer: number, id_user: number) {
    // Verificar que el usuario existe
    const user = await this.userModel.findOne({ where: { id_user: id_user } });
    if (!user) throw new NotFoundException('Este usuario no existe');

    // Verificar que la oferta existe
    const offer = await this.offersModel.findOne({
      where: { id_offer: id_offer },
    });
    if (!offer) throw new NotFoundException('Esta oferta no existe');

    // Verificar si el usuario ya canjeó esta oferta
    const alreadyRedeemed = await this.userRedeemedOffersModel.findOne({
      where: {
        id_user: id_user,
        id_offer: id_offer,
      },
    });

    if (alreadyRedeemed) {
      throw new BadRequestException(
        'Ya has canjeado esta oferta anteriormente',
      );
    }

    // Verificar si el usuario tiene suficientes puntos
    if (user.dataValues.points < offer.dataValues.cost) {
      throw new BadRequestException(
        'No tienes puntos suficientes para canjear esta oferta',
      );
    }

    const rest_points = user.dataValues.points - offer.dataValues.cost;

    // Actualizar los puntos del usuario
    await user.update({ points: rest_points });

    // Registrar el canje en la tabla de ofertas canjeadas
    await this.userRedeemedOffersModel.create({
      id_user: id_user,
      id_offer: id_offer,
      points_used: offer.dataValues.cost,
    } as any);

    return {
      message: 'La Oferta fue reclamada con éxito',
      code: '200',
      offer_details: {
        name: offer.dataValues.name,
        cost: offer.dataValues.cost,
        remaining_points: rest_points,
        redeemed_at: new Date(),
      },
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
