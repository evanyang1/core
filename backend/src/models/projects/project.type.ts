import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { Key } from "../keys/key.type";
import { User } from "../users/user.type";

@ObjectType()
@Table({
  paranoid: true,
  timestamps: true,
})
export class Project extends Model {
  @Field(() => ID)
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  // NOTE: This is really the schema where we want to do the lookup
  // NOTE: This could be any string value
  // IDEAL World this will be a namespaced random bytes auth_(bites)
  @Field()
  @Column
  public projectId!: string;

  @Field(() => String)
  @Column(DataType.STRING)
  public name!: string;

  // This could be a public key, or something else,
  // But the goal with this is that every project will have its own signing secret
  // This is key for security across projects and users to verify tokens
  @Column
  public jwtSigningSecret!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId!: string;

  @Field(() => User)
  @BelongsTo(() => User)
  public userInfo!: User;

  // KEYS
}
