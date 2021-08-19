import { Response } from 'express';

export interface IDeleteUserController {
  handle(id: string, res: Response): Promise<void>;
}

export { DeleteUserController } from './DeleteUser.controller';
