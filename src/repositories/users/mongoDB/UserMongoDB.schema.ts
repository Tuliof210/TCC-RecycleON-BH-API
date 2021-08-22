import { UserViewDTO } from 'src/DTO';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ versionKey: false, timestamps: true })
export class UserSchemaDTO extends Document implements UserViewDTO {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 10 })
  password: string;

  @Prop({ required: true })
  active: boolean;
}

export const UserCollection = 'User';
export const UserSchema = SchemaFactory.createForClass(UserSchemaDTO);
export type UserModel = Model<UserViewDTO, Document>;

UserSchema.methods.view = function (responseView = false): UserViewDTO {
  return responseView ? this : { _id: this._id, name: this.name, email: this.email };
};
UserSchema.methods.disable = function () {
  return this.set({ active: false }).save();
};

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const saltOrRounds = 10;
    bcrypt
      .hash(this.password, saltOrRounds)
      .then((hash: string) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else next();
});
