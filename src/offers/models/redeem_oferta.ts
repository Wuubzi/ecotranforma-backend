import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from 'sequelize-typescript';
import { offers } from './ofertas';
import { User } from 'src/users/models/User';

@Table({
  tableName: 'user_redeemed_offers',
})
export class UserRedeemedOffers extends Model<UserRedeemedOffers> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_reedem: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id_user: number;

  @ForeignKey(() => offers)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id_offer: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  points_used: number;

  @CreatedAt
  @Column(DataType.DATE)
  redeemed_at: Date;

  // Relaciones
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => offers)
  offer: offers;
}
