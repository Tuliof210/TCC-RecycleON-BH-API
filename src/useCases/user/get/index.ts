import { User } from 'src/entities';

import { Response } from 'express';

export interface IGetUserController {
  handle(id: string, res: Response): Promise<void>;
}

export const GET_USER_SERVICE = 'GET_USER_SERVICE';
export interface IGetUserService {
  execute(id: string): Promise<void | User>;
}

export { GetUserController } from './GetUser.controller';
export { GetUserService } from './GetUser.service';
