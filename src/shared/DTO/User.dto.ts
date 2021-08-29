import { User } from 'src/shared/entities';

export type CreateUserDTO = Omit<User, '_id' | 'active'>;
export type UpdateUserDTO = Pick<User, 'name'>;
export interface UserDocumentDTO extends Partial<User> {
  _id?: any;
  authenticate?: (password: string) => Promise<void | UserDocumentDTO>;
  disable?: () => Promise<UserDocumentDTO>;
  view?: (fullView?: boolean) => UserDocumentDTO;
}
