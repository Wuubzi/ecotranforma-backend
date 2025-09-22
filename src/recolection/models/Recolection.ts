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
} from 'sequelize-typescript';
import { User } from 'src/users/models/User';

@Table
export class Recolection extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_recolection: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User, { foreignKey: 'userId', targetKey: 'id_user' })
  user: User;

  @Column(DataType.STRING)
  direccion: string;

  @Column(DataType.STRING)
  fecha: string;

  @Column(DataType.STRING)
  hora: string;

  @Column(DataType.STRING)
  estado: string;
}
