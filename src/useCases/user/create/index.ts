import { CreateUserDTO, UserViewDTO } from 'src/DTO';

export interface ICreateUserController {
  handle(userData: CreateUserDTO): Promise<UserViewDTO>;
}

export const CREATE_USER_SERVICE = 'CREATE_USER_SERVICE';
export interface ICreateUserService {
  execute(userData: CreateUserDTO): Promise<UserViewDTO>;
}

export { CreateUserValidationPipe } from './CreateUser.pipe';
export { CreateUserController } from './CreateUser.controller';
export { CreateUserService } from './CreateUser.service';
