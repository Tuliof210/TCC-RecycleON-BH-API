import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/DTO';

export interface IUserController {
  create(userData: CreateUserDTO): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;

  retrieve(userQuery: Record<string, unknown>): Promise<{ count: number; list: UserViewDTO[] }>;
  getById(userId: string): Promise<UserViewDTO>;

  disable(userId: string): Promise<UserViewDTO>;
  delete(userId: string): Promise<UserViewDTO>;
}

export interface IUserService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserViewDTO>;

  getById(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<UserViewDTO>;
  retrieve(userQuery: Record<string, unknown>, fullView?: boolean): Promise<{ count: number; list: UserViewDTO[] }>;

  disable(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserViewDTO>;
}

export { UserModule } from './User.module';
