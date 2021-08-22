import { UserViewDTO, UpdateUserDTO } from 'src/DTO';

export interface IUpdateUserController {
  handle(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
}

export const UPDATE_USER_SERVICE = 'UPDATE_USER_SERVICE';
export interface IUpdateUserService {
  execute(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
}

export { UpdateUserController } from './UpdateUser.controller';
export { UpdateUserService } from './UpdateUser.service';
