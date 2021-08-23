import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/DTO';

export const AUTH_SERVICE = 'AUTH_SERVICE';
export interface IAuthService {
  login(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
  signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}
export { AuthService } from './Auth.service';

//---------------------------------------------------

export const USER_SERVICE = 'USER_SERVICE';
export interface IUserService {
  create(userData: CreateUserDTO): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
  retrieve(userQuery: any): Promise<{ count: number; list: UserViewDTO[] }>;
  getOne(userId: string): Promise<UserViewDTO>;
  disable(userId: string): Promise<UserViewDTO>;
  delete(userId: string): Promise<UserViewDTO>;
}
export { UserService } from './User.service';
