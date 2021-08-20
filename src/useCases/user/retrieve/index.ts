import { User } from 'src/entities';

import { Response } from 'express';

export interface IRetrieveUsersController {
  handle(query: any, res: Response): Promise<void>;
}

export const RETRIEVE_USERS_SERVICE = 'RETRIEVE_USERS_SERVICE';
export interface IRetrieveUsersService {
  execute(userQuery: any): Promise<{ count: number; data: User[] }>;
}

export { RetrieveUsersController } from './RetrieveUsers.controller';
export { RetrieveUsersService } from './RetrieveUsers.service';
