import { AuthPayloadDTO, UserViewDTO } from 'src/shared/DTO';

export interface IAuthController {
  login({ user }: { user: AuthPayloadDTO }): Promise<{ token: string }>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserViewDTO>;
  login(payload: AuthPayloadDTO): Promise<{ token: string }>;
}

export { AuthModule } from './Auth.module';
