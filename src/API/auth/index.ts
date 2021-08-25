import { LocalAuthDTO, UserViewDTO } from 'src/shared/DTO';

export interface IAuthController {
  login({ user }: { user: LocalAuthDTO }): Promise<{ token: string }>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserViewDTO>;
  login(user: LocalAuthDTO): Promise<{ token: string }>;
}

export { AuthModule } from './Auth.module';
