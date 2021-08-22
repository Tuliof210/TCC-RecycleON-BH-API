import { UserViewDTO } from 'src/DTO';
import { StandardSuccess } from 'src/classes';

export interface IGetUserController {
  handle(userId: string): Promise<StandardSuccess<UserViewDTO>>;
}

export const GET_USER_SERVICE = 'GET_USER_SERVICE';
export interface IGetUserService {
  execute(userId: string): Promise<UserViewDTO>;
}

export { GetUserController } from './GetUser.controller';
export { GetUserService } from './GetUser.service';
