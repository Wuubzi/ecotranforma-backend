/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ConflictException, Injectable } from '@nestjs/common';
import { voluntarioDTO } from './dto/voluntarioDTO';
import { actividadesDTO } from './dto/actividadesDTO';
import { InjectModel } from '@nestjs/sequelize';
import { actividades } from './models/actividades';
import { voluntarios } from './models/voluntarios';

@Injectable()
export class LandingService {
  constructor(
    @InjectModel(actividades) private actividadesModel: typeof actividades,
    @InjectModel(voluntarios) private voluntariosModel: typeof voluntarios,
  ) {}
  async voluntarios(data: voluntarioDTO) {
    const userEmail = await this.voluntariosModel.findOne({
      where: { email: data.email },
    });

    if (userEmail)
      throw new ConflictException('El correo electronico ya esta en uso');

    const userPhone = await this.actividadesModel.findOne({
      where: { phone_number: data.number_phone },
    });

    if (userPhone)
      throw new ConflictException('El numero de telefono ya esta en uso');

    await this.voluntariosModel.create({
      names: data.names,
      email: data.email,
      phone_number: data.number_phone,
      address: data.address,
      time_disponibility: data.time_disponibility,
      day_week: data.day_week,
    } as any);

    return {
      message:
        '¡Gracias por unirte a EcoTransforma! Tu inscripción como voluntario ha sido registrada. Pronto te contactaremos con las actividades disponibles en tu comunidad. 🌱🤝',
    };
  }

  async actividades(data: actividadesDTO) {
    await this.actividadesModel.create({
      names: data.request_name,
      place: data.place_type,
      name_place: data.place_name,
      phone_number: data.request_contact,
      email: data.request_email,
      address: data.request_address,
      type_activity: data.activity_types,
    } as any);

    return {
      message:
        '¡Solicitud recibida! Estamos revisando las necesidades de tu comunidad para asignar actividades que generen un impacto positivo. Te mantendremos informado. 🏘️💚',
    };
  }
}
