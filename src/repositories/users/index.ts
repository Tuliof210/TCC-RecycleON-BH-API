import { User } from 'src/entities';
import { UserViewDTO, UpdateUserDTO } from 'src/DTO';

export interface IUserRepository {
  save(user: User, fullView?: boolean): Promise<UserViewDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserViewDTO>;

  findById(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  retrieveAll(userQuery: any, fullView?: boolean): Promise<{ count: number; list: UserViewDTO[] }>;

  deactivate(userId: string, fullView?: boolean): Promise<UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserViewDTO>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
