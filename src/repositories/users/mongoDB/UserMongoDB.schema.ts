import { roles } from 'src/shared/entities';
import { UserViewDTO } from 'src/shared/DTO';

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

  @Prop({ required: true, default: roles.User, enum: roles })
  role: string;

  @Prop({ required: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaDTO);
export type UserModel = Model<UserViewDTO, Document>;

//---------------------------------------------------

UserSchema.methods.authenticate = function (password: string): Promise<void | UserViewDTO> {
  return bcrypt.compare(password, this.password).then((valid) => (valid ? this : undefined));
};

UserSchema.methods.disable = function () {
  return this.set({ active: false }).save();
};

UserSchema.methods.view = function (responseView = false): UserViewDTO {
  const publicView = {};
  const publicKeys = ['_id', 'name', 'email', 'role'];

  publicKeys.forEach((key) => (publicView[key] = this[key]));
  return responseView ? this : publicView;
};

//---------------------------------------------------

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
