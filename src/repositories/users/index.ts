import { User } from 'src/shared/entities';
import { UserViewDTO, UpdateUserDTO } from 'src/shared/DTO';

export interface IUserRepository {
  save(user: User, fullView?: boolean): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserViewDTO>;

  findOne(user: UserViewDTO, fullView?: boolean): Promise<void | UserViewDTO>;
  getById(_id: string, fullView?: boolean): Promise<UserViewDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserViewDTO>;
  retrieveAll(userQuery: Record<string, unknown>, fullView?: boolean): Promise<{ count: number; list: UserViewDTO[] }>;

  deactivate(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserViewDTO>;
}
export const IUserRepositoryToken = 'IUserRepositoryToken';
