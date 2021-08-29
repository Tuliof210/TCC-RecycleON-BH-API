import { User } from 'src/shared/entities';

export type CreateUserDTO = Pick<User, 'name' | 'email'>;
export type UpdateUserDTO = Partial<Pick<User, 'name' | 'email' | 'role'>>;
export interface UserDocumentDTO extends Partial<User> {
  _id?: any;
  authenticate?: (password: string) => Promise<void | UserDocumentDTO>;
  disable?: () => Promise<UserDocumentDTO>;
  view?: (fullView?: boolean) => UserDocumentDTO;
}
