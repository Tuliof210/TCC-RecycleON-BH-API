import { Response } from 'express';

export interface IDeleteUserController {
  handle(userId: string, res: Response): Promise<void>;
}

export { DeleteUserController } from './DeleteUser.controller';
