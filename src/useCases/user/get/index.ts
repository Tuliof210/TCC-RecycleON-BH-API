import { UserViewDTO } from 'src/DTO';

export interface IGetUserController {
  handle(userId: string): Promise<UserViewDTO>;
}

export const GET_USER_SERVICE = 'GET_USER_SERVICE';
export interface IGetUserService {
  execute(userId: string): Promise<UserViewDTO>;
}

export { GetUserController } from './GetUser.controller';
export { GetUserService } from './GetUser.service';
