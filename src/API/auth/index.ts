import { AuthPayloadDTO, UserDocumentDTO } from 'src/shared/DTO';

export interface IAuthController {
  login({ user }: { user: AuthPayloadDTO }): Promise<{ token: string }>;
  test(): Record<string, unknown>;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<void | UserDocumentDTO>;
  login(payload: AuthPayloadDTO): Promise<{ token: string }>;
}
export const IAuthServiceToken = 'IAuthServiceToken';

export { AuthModule } from './Auth.module';
