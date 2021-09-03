import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDTO, UserDocumentDTO } from 'src/shared/DTO';

export interface IUserController {
  create(userData: CreateUserDTO): Promise<{ token: string; user: UserDTO }>;
  updateMe({ user }: { user: UserDocumentDTO }, userChanges: UpdateUserDTO): Promise<UserDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserDTO>;

  retrieve(userQuery: QueryParamsDTO): Promise<{ count: number; list: Array<UserDTO> }>;
  turnIntoAdmin(userId: string): Promise<UserDTO>;

  getMe({ user }: { user: UserDocumentDTO }): UserDTO;
  get(userId: string): Promise<UserDTO>;

  disableMe({ user }: { user: UserDocumentDTO }): Promise<UserDTO>;
  disable(userId: string): Promise<UserDTO>;
  delete(userId: string): Promise<UserDTO>;
}

export interface IUserService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserDTO>;
  updateMe(user: UserDocumentDTO, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDTO>;

  retrieve(userQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<UserDTO> }>;
  getById(userId: string, fullView?: boolean): Promise<UserDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserDTO>;

  disable(userId: string, fullView?: boolean): Promise<UserDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserDTO>;
}
export const IUserServiceToken = 'IUserServiceToken';

export { UserModule } from './User.module';
