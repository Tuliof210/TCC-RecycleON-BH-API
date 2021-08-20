import { UserViewDTO } from 'src/DTO';

import { Response } from 'express';

export interface IDisableUserController {
  handle(userId: string, res: Response): Promise<void>;
}

export const DISABLE_USER_SERVICE = 'DISABLE_USER_SERVICE';
export interface IDisableUserService {
  execute(userId: string): Promise<void | UserViewDTO>;
}

export { DisableUserController } from './DisableUser.controller';
export { DisableUserService } from './DisableUser.service';
