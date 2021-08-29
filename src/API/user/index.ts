import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserViewDTO } from 'src/shared/DTO';

export interface IUserController {
  create(masterKey: string, userData: CreateUserDTO): Promise<UserViewDTO>;
  updateMe({ user }: { user: UserViewDTO }, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;

  retrieve(userQuery: QueryParamsDTO): Promise<{ count: number; list: UserViewDTO[] }>;
  getMe({ user }: { user: UserViewDTO }): UserViewDTO;
  get(userId: string): Promise<UserViewDTO>;

  disableMe({ user }: { user: UserViewDTO }): Promise<UserViewDTO>;
  disable(userId: string): Promise<UserViewDTO>;
  delete(userId: string): Promise<UserViewDTO>;
}

export interface IUserService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserViewDTO>;

  retrieve(userQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: UserViewDTO[] }>;
  getById(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserViewDTO>;

  disable(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserViewDTO>;
}
export const IUserServiceToken = 'IUserServiceToken';

export { UserModule } from './User.module';
