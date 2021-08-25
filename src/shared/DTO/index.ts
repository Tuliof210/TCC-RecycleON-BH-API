import { User } from 'src/shared/entities';

export type CreateUserDTO = Omit<User, '_id' | 'active' | 'role'>;
export type UpdateUserDTO = Pick<User, 'name'>;
export interface UserViewDTO extends Partial<User> {
  _id?: any;
  authenticate?: (password: string) => Promise<void | UserViewDTO>;
  disable?: () => Promise<UserViewDTO>;
  view?: (responseView?: boolean) => UserViewDTO;
}
