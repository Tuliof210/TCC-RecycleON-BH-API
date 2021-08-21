import { CreateUserDTO, UserViewDTO } from 'src/DTO';

import { Response } from 'express';

export interface ICreateUserController {
  handle(userData: CreateUserDTO, res: Response): Promise<void>;
}

export const CREATE_USER_SERVICE = 'CREATE_USER_SERVICE';
export interface ICreateUserService {
  execute(userData: CreateUserDTO): Promise<UserViewDTO>;
}

export { CreateUserController } from './CreateUser.controller';
export { CreateUserService } from './CreateUser.service';
