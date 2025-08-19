import { Model } from 'sequelize-typescript';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class voluntarios extends Model<voluntarios> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_volunteer: number;

  @AllowNull(false)
  @Column
  names: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  phone_number: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  time_disponibility: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  day_week: string[];
}
