import { UserViewDTO } from 'src/DTO';

export interface IAuthController {
  login({ user }: { user: UserViewDTO }): Promise<{ token: string }>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserViewDTO>;
  login(user: UserViewDTO): Promise<{ token: string }>;
}

export { AuthModule } from './Auth.module';
