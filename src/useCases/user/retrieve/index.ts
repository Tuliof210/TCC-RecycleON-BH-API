import { UserViewDTO } from 'src/DTO';

import { Response } from 'express';

export interface IRetrieveUsersController {
  handle(userQuery: any, res: Response): Promise<void>;
}

export const RETRIEVE_USERS_SERVICE = 'RETRIEVE_USERS_SERVICE';
export interface IRetrieveUsersService {
  execute(userQuery: any): Promise<{ count: number; data: UserViewDTO[] }>;
}

export { RetrieveUsersController } from './RetrieveUsers.controller';
export { RetrieveUsersService } from './RetrieveUsers.service';
