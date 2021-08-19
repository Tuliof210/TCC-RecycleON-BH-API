import { Response } from 'express';

export interface IDisableUserController {
  handle(id: string, res: Response): Promise<void>;
}

export { DisableUserController } from './DisableUser.controller';
