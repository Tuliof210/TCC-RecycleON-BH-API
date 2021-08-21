import { UserViewDTO } from 'src/DTO';

import { Response } from 'express';

export interface IGetUserController {
  handle(userId: string, res: Response): Promise<void>;
}

export const GET_USER_SERVICE = 'GET_USER_SERVICE';
export interface IGetUserService {
  execute(userId: string): Promise<void | UserViewDTO>;
}

export { GetUserController } from './GetUser.controller';
export { GetUserService } from './GetUser.service';
