import { UserRole, EmailRegex } from 'src/shared/entities';
import { UserDTO } from 'src/shared/DTO';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ versionKey: false, timestamps: true })
class UserProps extends Document implements UserDTO {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, match: EmailRegex })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: UserRole.user, enum: UserRole })
  role: string;

  @Prop({ required: true })
  active: boolean;

  @Prop()
  keywords: string[];
}
export const UserSchema = SchemaFactory.createForClass(UserProps);

export const UserCollection = 'User';
export type UserModel = Model<UserDTO, Document>;

//=================================================================================

UserSchema.methods.authenticate = async function (password: string): Promise<void | UserDTO> {
  const valid = await bcrypt.compare(password, this.password);
  return valid ? this : undefined;
};

UserSchema.methods.disable = function () {
  return this.set({ active: false }).save();
};

UserSchema.methods.view = function (fullView = false): UserDTO {
  const userView = {};
  const publicKeys = ['_id', 'name', 'email', 'role'];
  const privateKeys = [...publicKeys, 'active', 'createdAt', 'updatedAt'];

  const mountUserView = (key: string) => {
    userView[key] = this[key];
  };

  if (fullView) privateKeys.forEach(mountUserView);
  else publicKeys.forEach(mountUserView);

  return userView;
};

//=================================================================================

UserSchema.pre('save', function (next) {
  this.keywords = updateKeywords(this.name.split(' '), [this.email.split('@')[0]]);

  if (this.isModified('password')) {
    const saltOrRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltOrRounds);
  }
  next();
});

function updateKeywords(name: string[], email: string[]) {
  const keywordsList = [...name, ...email];
  return Array.from(new Set(keywordsList));
}
