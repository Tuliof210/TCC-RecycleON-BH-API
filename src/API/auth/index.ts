import { AuthPayloadDTO, UserDTO } from 'src/shared/DTO';

export interface IAuthController {
  login({ user }: { user: AuthPayloadDTO }): Promise<{ token: string }>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserDTO>;
  login(payload: AuthPayloadDTO): Promise<{ token: string }>;
}
export const IAuthServiceToken = 'IAuthServiceToken';

export { AuthModule } from './Auth.module';
