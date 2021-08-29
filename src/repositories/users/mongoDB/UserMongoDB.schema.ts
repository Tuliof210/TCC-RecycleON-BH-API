import { UserRole, EmailRegex, PasswordRegex } from 'src/shared/entities';
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

  @Prop({ required: true, unique: true, match: EmailRegex })
  email: string;

  @Prop({ required: true, match: PasswordRegex })
  password: string;

  @Prop({ required: true, default: UserRole.user, enum: UserRole })
  role: string;

  @Prop({ required: true })
  active: boolean;
}

export const UserCollection = 'User';
export const UserSchema = SchemaFactory.createForClass(UserSchemaDTO);
export type UserModel = Model<UserViewDTO, Document>;

//---------------------------------------------------

UserSchema.methods.authenticate = async function (password: string): Promise<void | UserViewDTO> {
  const valid = await bcrypt.compare(password, this.password);
  return valid ? this : undefined;
};

UserSchema.methods.disable = function () {
  return this.set({ active: false }).save();
};

UserSchema.methods.view = function (responseView = false): UserViewDTO {
  const publicView = {};
  const publicKeys = ['_id', 'name', 'email', 'role'];

  const mountPublicView = (key: string) => {
    publicView[key] = this[key];
  };

  publicKeys.forEach(mountPublicView);
  return responseView ? this : publicView;
};

//---------------------------------------------------

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const saltOrRounds = 10;
    const setEncryptPassword = (hash: string) => {
      this.password = hash;
      next();
    };

    bcrypt.hash(this.password, saltOrRounds).then(setEncryptPassword).catch(next);
  } else next();
});
