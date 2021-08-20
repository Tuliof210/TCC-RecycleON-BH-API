import { CreateUserDTO } from 'src/DTO';
import { User } from 'src/entities';

import { Response } from 'express';

export interface ICreateUserController {
  handle(userData: CreateUserDTO, res: Response): Promise<void>;
}

export const CREATE_USER_SERVICE = 'CREATE_USER_SERVICE';
export interface ICreateUserService {
  execute(userData: CreateUserDTO): Promise<User>;
}

export { CreateUserController } from './CreateUser.controller';
export { CreateUserService } from './CreateUser.service';
