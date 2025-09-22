/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Deposit } from './Deposit';
import { Optional } from 'sequelize';

// 1) Declaramos tipos:
interface DetailsAttributes {
  id_details_deposit: number;
  depositId: number;
  name: string;
  unit: string;
  quantity: number;
  points: number;
}

interface DetailsCreationAttributes
  extends Optional<DetailsAttributes, 'id_details_deposit'> {}

@Table
export class DetailsDeposit extends Model<
  DetailsAttributes,
  DetailsCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_details_deposit: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  unit: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.INTEGER)
  points: number;

  @ForeignKey(() => Deposit)
  @Column(DataType.INTEGER)
  depositId: number;

  @BelongsTo(() => Deposit)
  deposit: Deposit;
}
