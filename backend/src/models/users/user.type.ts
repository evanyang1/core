import {
  Column,
  DataType,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { Login } from "../logins/login.type";

@ObjectType()
@Table({
  paranoid: true,
  timestamps: true,
})
export class User extends Model {
  @Field(() => ID)
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUIDV4)
  public id!: string;

  @Field(() => String)
  @Column(DataType.STRING)
  public firstName!: string;

  @Field(() => String)
  @Column(DataType.STRING)
  public lastName!: string;

  @Field(() => String)
  @Column(DataType.STRING)
  public userName!: string;

  @Field(() => Login, { nullable: true })
  @HasOne(() => Login)
  public login!: Login;
}
