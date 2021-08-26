import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/shared/DTO';

export interface IUserController {
  create(userData: CreateUserDTO): Promise<UserViewDTO>;
  updateMe({ user }: { user: UserViewDTO }, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;

  getMe({ user }: { user: UserViewDTO }): Promise<UserViewDTO>;
  getById(userId: string): Promise<UserViewDTO>;
  retrieve(userQuery: Record<string, unknown>): Promise<{ count: number; list: UserViewDTO[] }>;

  disableMe({ user }: { user: UserViewDTO }): Promise<UserViewDTO>;
  disable(userId: string): Promise<UserViewDTO>;
  delete(userId: string): Promise<UserViewDTO>;
}

export interface IUserService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserViewDTO>;

  getById(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserViewDTO>;
  retrieve(userQuery: Record<string, unknown>, fullView?: boolean): Promise<{ count: number; list: UserViewDTO[] }>;

  disable(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserViewDTO>;
}
export const UserServiceToken = 'UserServiceToken';

export { UserModule } from './User.module';
