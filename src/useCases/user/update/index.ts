import { UpdateUserDTO } from './UpdateUser.DTO';

import { Response } from 'express';

export interface IUpdateUserController {
  handle(id: string, updateUserDTO: UpdateUserDTO, res: Response): Promise<void>;
}

export { UpdateUserDTO } from './UpdateUser.DTO';
export { UpdateUserController } from './UpdateUser.controller';
