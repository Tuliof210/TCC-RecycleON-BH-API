import { CreateUserDTO, LoginDTO, UserViewDTO } from 'src/DTO';

export interface IAuthController {
  login(loginData: LoginDTO): Promise<{ token: string; user: UserViewDTO }>;
  signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export interface IAuthService {
  login(loginData: LoginDTO): Promise<{ token: string; user: UserViewDTO }>;
  signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export { AuthModule } from './Auth.module';
