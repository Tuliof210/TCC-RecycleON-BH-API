import { UserViewDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface IDeleteUserController {
  handle(userId: string): Promise<StandardSuccess<void | UserViewDTO> | StandardError>;
}

export const DELETE_USER_SERVICE = 'DELETE_USER_SERVICE';
export interface IDeleteUserService {
  execute(userId: string): Promise<void | UserViewDTO>;
}

export { DeleteUserController } from './DeleteUser.controller';
export { DeleteUserService } from './DeleteUser.service';
