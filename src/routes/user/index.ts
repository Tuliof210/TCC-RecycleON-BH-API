import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/DTO';

export interface IUserController {
  create(userData: CreateUserDTO): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;

  retrieve(userQuery: any): Promise<{ count: number; list: UserViewDTO[] }>;
  getOne(userId: string): Promise<UserViewDTO>;

  disable(userId: string): Promise<UserViewDTO>;
  delete(userId: string): Promise<UserViewDTO>;
}

export { UserModule } from './User.module';
