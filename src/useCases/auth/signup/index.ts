import { CreateUserDTO, UserViewDTO } from 'src/DTO';

export interface ISignupController {
  handle(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export const SIGNUP_USER_SERVICE = 'SIGNUP_USER_SERVICE';
export interface ISignupService {
  execute(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}

export {} from './Signup.pipe';
export {} from './Signup.controller';
export {} from './Signup.service';
