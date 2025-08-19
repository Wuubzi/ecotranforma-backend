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
}
