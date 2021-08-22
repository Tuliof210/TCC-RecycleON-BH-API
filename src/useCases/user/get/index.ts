import { UserViewDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface IGetUserController {
  handle(userId: string): Promise<StandardSuccess<void | UserViewDTO> | StandardError>;
}

export const GET_USER_SERVICE = 'GET_USER_SERVICE';
export interface IGetUserService {
  execute(userId: string): Promise<void | UserViewDTO>;
}

export { GetUserController } from './GetUser.controller';
export { GetUserService } from './GetUser.service';
