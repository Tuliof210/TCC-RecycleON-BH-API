import { UserViewDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface IDisableUserController {
  handle(userId: string): Promise<StandardSuccess<void | UserViewDTO> | StandardError>;
}

export const DISABLE_USER_SERVICE = 'DISABLE_USER_SERVICE';
export interface IDisableUserService {
  execute(userId: string): Promise<void | UserViewDTO>;
}

export { DisableUserController } from './DisableUser.controller';
export { DisableUserService } from './DisableUser.service';
