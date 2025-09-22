import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recolection } from './models/Recolection';
import { CreateRecolectionDto } from './DTO/create-recolection.dto';
import { UpdateRecolectionDto } from './DTO/update-recolection.dto';
import { User } from 'src/users/models/User';

@Injectable()
export class RecolectionService {
  constructor(
    @InjectModel(Recolection)
    private recolectionModel: typeof Recolection,
  ) {}

  // Crear una nueva recolección
  async add_recoletion(
    createRecolectionDto: CreateRecolectionDto,
  ): Promise<Recolection> {
    const recolectionData = {
      ...createRecolectionDto,
      estado: createRecolectionDto.estado || 'pendiente',
    };

    return await this.recolectionModel.create(recolectionData);
  }

  // Obtener todas las recolecciones de un usuario
  async get_recolections(userId: number): Promise<Recolection[]> {
    return await this.recolectionModel.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id_user', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // Obtener todas las recolecciones (para admin)
  async getAllRecolections(): Promise<Recolection[]> {
    return await this.recolectionModel.findAll({
      include: [
        {
          model: User,
          attributes: ['id_user', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // Obtener una recolección por ID
  async getRecolectionById(id: number): Promise<Recolection> {
    const recolection = await this.recolectionModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id_user', 'name', 'email'],
        },
      ],
    });

    if (!recolection) {
      throw new NotFoundException(`Recolección con ID ${id} no encontrada`);
    }

    return recolection;
  }

  // Actualizar una recolección
  async updateRecolection(
    id: number,
    updateRecolectionDto: UpdateRecolectionDto,
  ): Promise<Recolection> {
    const recolection = await this.getRecolectionById(id);

    await recolection.update(updateRecolectionDto);
    return recolection;
  }

  // Eliminar una recolección
  async deleteRecolection(id: number): Promise<void> {
    const recolection = await this.getRecolectionById(id);
    await recolection.destroy();
  }

  // Obtener recolecciones por estado
  async getRecolectionsByStatus(estado: string): Promise<Recolection[]> {
    return await this.recolectionModel.findAll({
      where: { estado },
      include: [
        {
          model: User,
          attributes: ['id_user', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // Obtener estadísticas de recolecciones
  async getRecolectionStats(): Promise<any> {
    const total = await this.recolectionModel.count();
    const pendientes = await this.recolectionModel.count({
      where: { estado: 'pendiente' },
    });
    const enProceso = await this.recolectionModel.count({
      where: { estado: 'en_proceso' },
    });
    const completadas = await this.recolectionModel.count({
      where: { estado: 'completada' },
    });
    const canceladas = await this.recolectionModel.count({
      where: { estado: 'cancelada' },
    });

    return {
      total,
      pendientes,
      enProceso,
      completadas,
      canceladas,
    };
  }
}
