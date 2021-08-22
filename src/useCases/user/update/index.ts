import { UserViewDTO, UpdateUserDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface IUpdateUserController {
  handle(userId: string, userChanges: UpdateUserDTO): Promise<StandardSuccess<void | UserViewDTO> | StandardError>;
}

export const UPDATE_USER_SERVICE = 'UPDATE_USER_SERVICE';
export interface IUpdateUserService {
  execute(userId: string, userChanges: UpdateUserDTO): Promise<void | UserViewDTO>;
}

export { UpdateUserController } from './UpdateUser.controller';
export { UpdateUserService } from './UpdateUser.service';
