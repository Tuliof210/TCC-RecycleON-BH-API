import { UserViewDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface IDisableUserController {
  handle(userId: string): Promise<StandardSuccess<UserViewDTO> | StandardError>;
}

export const DISABLE_USER_SERVICE = 'DISABLE_USER_SERVICE';
export interface IDisableUserService {
  execute(userId: string): Promise<UserViewDTO>;
}

export { DisableUserController } from './DisableUser.controller';
export { DisableUserService } from './DisableUser.service';
