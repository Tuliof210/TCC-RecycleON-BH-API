import { UserViewDTO, UpdateUserDTO } from 'src/DTO';

import { Response } from 'express';

export interface IUpdateUserController {
  handle(userId: string, userChanges: UpdateUserDTO, res: Response): Promise<void>;
}

export const UPDATE_USER_SERVICE = 'UPDATE_USER_SERVICE';
export interface IUpdateUserService {
  execute(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
}

export { UpdateUserController } from './UpdateUser.controller';
export { UpdateUserService } from './UpdateUser.service';
