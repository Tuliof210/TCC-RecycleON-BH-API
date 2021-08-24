import { CreateUserDTO, LoginDTO, UpdateUserDTO, UserViewDTO } from 'src/DTO';

export interface IAuthService {
  login(loginData: LoginDTO): Promise<{ token: string; user: UserViewDTO }>;
  signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export interface IUserService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserViewDTO>;

  findById(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  findByEmail(email: string, fullView?: boolean): Promise<UserViewDTO>;
  retrieve(userQuery: Record<string, unknown>, fullView?: boolean): Promise<{ count: number; list: UserViewDTO[] }>;

  disable(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserViewDTO>;
}

export { AuthService } from './Auth.service';
export { UserService } from './User.service';
