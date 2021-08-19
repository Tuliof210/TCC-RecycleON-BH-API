import { User } from 'src/entities/User';
import { CreateUserDTO } from './CreateUser.DTO';
import { Response } from 'express';

//export { CreateUserController } from './CreateUser.controller';
export interface ICreateUserController {
  handle(createUserDTO: CreateUserDTO, res: Response): Promise<void>;
}

//export { CreateUserService } from './CreateUser.service';
export const CREATE_USER_SERVICE = 'CREATE USER SERVICE';
export interface ICreateUserService {
  execute(userData: CreateUserDTO): Promise<User>;
}
