/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from 'src/users/models/User';
import { DetailsDeposit } from './DetailsDeposit';

// 1) Definir tipos para TS:
interface DepositAttributes {
  details: any;
  id_deposit: number;
  userId: number;
  createdAt?: Date;
}

interface DepositCreationAttributes
  extends Optional<DepositAttributes, 'id_deposit'> {}

@Table
export class Deposit extends Model<
  DepositAttributes,
  DepositCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_deposit: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => DetailsDeposit)
  details: DetailsDeposit[];
}
