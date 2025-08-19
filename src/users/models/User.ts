import { Model } from 'sequelize-typescript';

import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_user: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @Column({
    type: DataType.NUMBER,
    defaultValue: 0,
  })
  points: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'usuario',
  })
  rol: string;
}
