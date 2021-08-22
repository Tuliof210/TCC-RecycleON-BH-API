import { UserViewDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface IDeleteUserController {
  handle(userId: string): Promise<StandardSuccess<UserViewDTO> | StandardError>;
}

export const DELETE_USER_SERVICE = 'DELETE_USER_SERVICE';
export interface IDeleteUserService {
  execute(userId: string): Promise<UserViewDTO>;
}

export { DeleteUserController } from './DeleteUser.controller';
export { DeleteUserService } from './DeleteUser.service';
