import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/User';
import { Deposit } from './models/Deposit';
import { DetailsDeposit } from './models/DetailsDeposit';
import { CreateDepositDto } from './DTO/create-deposit.dto';

@Injectable()
export class DepositService {
  private readonly COMMISSION_RATE = 0.1; // 10%
  private readonly POINTS_VALUE = 1000; // 1 punto = 1000 COP
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Deposit) private depositModel: typeof Deposit,
    @InjectModel(DetailsDeposit) private detailsModel: typeof DetailsDeposit,
  ) {}

  async get_deposits(id_user: number) {
    return this.userModel.findByPk(id_user, {
      attributes: ['id_user', 'name', 'email'],
      include: [
        {
          model: Deposit,
          attributes: ['id_deposit', 'createdAt'],
          include: [
            {
              model: DetailsDeposit,
              attributes: [
                'id_details_deposit',
                'name',
                'unit',
                'quantity',
                'points',
              ],
            },
          ],
        },
      ],
    });
  }

  async get_deposit(id_deposit: number) {
    const deposit = await this.depositModel.findByPk(id_deposit, {
      attributes: ['id_deposit', 'createdAt'],
      include: [
        {
          model: DetailsDeposit,
          attributes: [
            'id_details_deposit',
            'name',
            'unit',
            'quantity',
            'points',
          ],
        },
      ],
    });

    if (!deposit) throw new NotFoundException('Este deposito no existe');

    return deposit;
  }
  // Función para calcular puntos basado en valor total
  private calculatePointsFromValue(totalValue: number): number {
    const commission = totalValue * this.COMMISSION_RATE;
    return Math.floor(commission / this.POINTS_VALUE);
  }

  async createDeposit(data: CreateDepositDto) {
    const sequelize = this.userModel.sequelize;
    if (!sequelize) return;
    const transaction = await sequelize.transaction();

    try {
      const user = await this.userModel.findOne({
        where: { id_user: data.userId },
        transaction,
      });

      if (!user) {
        await transaction.rollback();
        throw new NotFoundException('Este Usuario no Existe');
      }

      // Crear el depósito
      const deposit = await this.depositModel.create(
        { userId: data.userId },
        { transaction },
      );

      // Procesar cada detalle y calcular puntos
      const detailsWithPoints = data.details.map((detail) => {
        const points = this.calculatePointsFromValue(detail.totalValue);
        return {
          ...detail,
          points,
          depositId: deposit.dataValues.id_deposit,
        };
      });

      // Crear los detalles con puntos calculados
      const detailPromises = detailsWithPoints.map((detail) =>
        this.detailsModel.create(detail, { transaction }),
      );

      await Promise.all(detailPromises);

      // Calcular el total de puntos de este depósito
      const totalPointsFromDeposit = detailsWithPoints.reduce(
        (total, detail) => {
          return total + detail.points;
        },
        0,
      );

      // Calcular el valor total del depósito
      const totalDepositValue = data.details.reduce((total, detail) => {
        return total + detail.totalValue;
      }, 0);

      // Actualizar los puntos del usuario
      const currentUserPoints = user.dataValues.points || 0;
      const newUserPoints = currentUserPoints + totalPointsFromDeposit;

      await this.userModel.update(
        { points: newUserPoints },
        { where: { id_user: data.userId }, transaction },
      );

      await transaction.commit();

      return {
        message: 'Deposito Añadido Correctamente',
        code: '200',
        data: {
          totalMaterialValue: totalDepositValue,
          commission: totalDepositValue * this.COMMISSION_RATE,
          pointsAdded: totalPointsFromDeposit,
          userTotalPoints: newUserPoints,
          details: detailsWithPoints.map((d) => ({
            name: d.name,
            quantity: d.quantity,
            unit: d.unit,
            totalValue: d.totalValue,
            points: d.points,
          })),
        },
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Método helper para calcular puntos de un valor (para usar en frontend)
  calculatePoints(totalValue: number): number {
    return this.calculatePointsFromValue(totalValue);
  }

  // Método para obtener el equivalente en COP de ciertos puntos
  getPointsValueInCOP(points: number): number {
    return points * this.POINTS_VALUE;
  }
}
