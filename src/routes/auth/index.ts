import { CreateUserDTO, UserViewDTO } from 'src/DTO';

export interface IAuthController {
  login(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
  signup(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export { AuthModule } from './Auth.module';
