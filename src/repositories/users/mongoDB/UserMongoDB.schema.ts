import { User } from 'src/entities';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = UserSchemaDTO & Document;
export const UserCollection = 'User';

@Schema({ versionKey: false, timestamps: true })
export class UserSchemaDTO extends User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaDTO);
