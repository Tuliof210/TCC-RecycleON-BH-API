import { CreateUserDTO, LoginDTO, UserViewDTO } from 'src/DTO';

export interface IAuthController {
  login({ user }: { user: UserViewDTO }): { token: string; user: UserViewDTO };
  //signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserViewDTO>;
  //signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export { AuthModule } from './Auth.module';
