import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { UserRedeemedOffers } from './redeem_oferta';

@Table
export class offers extends Model<offers> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_offer;

  @AllowNull(false)
  @Column
  name: string;
  @AllowNull(false)
  @Column
  description: string;
  @AllowNull(false)
  @Column
  cost: number;
  @AllowNull(false)
  @Column
  category: string;

  // Relación con las ofertas canjeadas
  @HasMany(() => UserRedeemedOffers)
  redeemedOffers: UserRedeemedOffers[];
}
