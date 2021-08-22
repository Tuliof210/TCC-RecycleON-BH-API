import { UserViewDTO } from 'src/DTO';

export interface IRetrieveUsersController {
  handle(userQuery: any): Promise<{ count: number; list: UserViewDTO[] }>;
}

export const RETRIEVE_USERS_SERVICE = 'RETRIEVE_USERS_SERVICE';
export interface IRetrieveUsersService {
  execute(userQuery: any): Promise<{ count: number; list: UserViewDTO[] }>;
}

export { RetrieveUsersController } from './RetrieveUsers.controller';
export { RetrieveUsersService } from './RetrieveUsers.service';
