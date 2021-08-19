import { User } from 'src/entities/User';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserSchemaDTO & Document;
export const UserCollection = 'User';

@Schema({ versionKey: false, timestamps: true })
export class UserSchemaDTO extends User {
  @Prop({ index: true, required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaDTO);
