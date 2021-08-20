import { UpdateUserDTO } from 'src/DTO';
import { User } from 'src/entities';

import { Response } from 'express';

export interface IUpdateUserController {
  handle(userId: string, userChanges: UpdateUserDTO, res: Response): Promise<void>;
}

export const UPDATE_USER_SERVICE = 'UPDATE_USER_SERVICE';
export interface IUpdateUserService {
  execute(userId: string, userChanges: UpdateUserDTO): Promise<User>;
}

export { UpdateUserController } from './UpdateUser.controller';
export { UpdateUserService } from './UpdateUser.service';
