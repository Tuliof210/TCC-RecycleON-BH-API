import { CreateUserDTO, UserViewDTO } from 'src/DTO';

export interface ISignupController {
  handle(userData: CreateUserDTO): Promise<{ token: string; user: UserViewDTO }>;
}
