import { UserViewDTO } from 'src/DTO';

export interface IAuthController {
  login({ user }: { user: UserViewDTO }): { token: string; user: UserViewDTO };
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserViewDTO>;
}

export { AuthModule } from './Auth.module';
