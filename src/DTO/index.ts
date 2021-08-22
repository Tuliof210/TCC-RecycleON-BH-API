import { User } from 'src/entities';

export type CreateUserDTO = Omit<User, '_id' | 'active'>;

export type UpdateUserDTO = Pick<User, 'name'>;
export interface UserViewDTO extends Partial<User> {
  _id?: any;
  view?: (responseView?: boolean) => UserViewDTO;
  disable?: () => Promise<UserViewDTO>;
}
