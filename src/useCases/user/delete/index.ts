import { UserViewDTO } from 'src/DTO';

import { Response } from 'express';

export interface IDeleteUserController {
  handle(userId: string, res: Response): Promise<void>;
}

export const DELETE_USER_SERVICE = 'DELETE_USER_SERVICE';
export interface IDeleteUserService {
  execute(userId: string): Promise<void | UserViewDTO>;
}

export { DeleteUserController } from './DeleteUser.controller';
export { DeleteUserService } from './DeleteUser.service';
