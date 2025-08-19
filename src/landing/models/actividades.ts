import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table
export class actividades extends Model<actividades> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_activity: number;

  @AllowNull(false)
  @Column
  names: string;

  @AllowNull(false)
  @Column
  place: string;

  @AllowNull(false)
  @Column
  name_place: string;

  @AllowNull(false)
  @Column
  phone_number: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  type_activity: string;
}
