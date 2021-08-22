import { UserViewDTO } from 'src/DTO';

export interface IDisableUserController {
  handle(userId: string): Promise<UserViewDTO>;
}

export const DISABLE_USER_SERVICE = 'DISABLE_USER_SERVICE';
export interface IDisableUserService {
  execute(userId: string): Promise<UserViewDTO>;
}

export { DisableUserController } from './DisableUser.controller';
export { DisableUserService } from './DisableUser.service';
