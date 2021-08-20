import { User } from 'src/entities';

export interface UserViewDTO extends Partial<User> {
  _id?: any;
  view?: (responseView?: boolean) => UserViewDTO;
}
