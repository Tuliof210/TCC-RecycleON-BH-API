import { CreateUserDTO, UserViewDTO } from 'src/DTO';
import { StandardSuccess, StandardError } from 'src/classes';

export interface ICreateUserController {
  handle(userData: CreateUserDTO): Promise<StandardSuccess<UserViewDTO> | StandardError>;
}

export const CREATE_USER_SERVICE = 'CREATE_USER_SERVICE';
export interface ICreateUserService {
  execute(userData: CreateUserDTO): Promise<UserViewDTO>;
}

export { CreateUserController } from './CreateUser.controller';
export { CreateUserService } from './CreateUser.service';
