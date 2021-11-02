import { User } from 'src/shared/entities';
import { Document } from 'mongoose';

export type CreateUserDTO = Pick<User, 'name' | 'email' | 'password'>;
export type UpdateUserDTO = Partial<Pick<User, 'name' | 'email' | 'role' | 'password'>>;
export interface UserDTO extends Partial<User> {
  _id?: any;
  authenticate?: (password: string) => Promise<void | UserDTO>;
  disable?: () => Promise<UserDTO>;
  view?: (fullView?: boolean) => UserDTO;
}
export type UserDocumentDTO = UserDTO & Document<any, any, UserDTO>;
