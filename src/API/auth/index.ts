import { UserDTO } from 'src/shared/DTO';

export interface IAuthController {
  login({ user }: { user: UserDTO }): Promise<{ token: string; user: UserDTO }>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserDTO>;
  login(payload: UserDTO): Promise<{ token: string; user: UserDTO }>;
}
export const IAuthServiceToken = 'IAuthServiceToken';

export { AuthModule } from './Auth.module';
