import { Response } from 'express';

export interface IDisableUserController {
  handle(userId: string, res: Response): Promise<void>;
}

export { DisableUserController } from './DisableUser.controller';
