import { User } from 'src/entities';
import { UserViewDTO, UpdateUserDTO } from 'src/DTO';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository {
  save(user: User, fullView?: boolean): Promise<UserViewDTO>;
  findById(userId: string, fullView?: boolean): Promise<void | UserViewDTO>;
  retrieveAll(userQuery: any, fullView?: boolean): Promise<{ count: number; data: UserViewDTO[] }>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<void | UserViewDTO>;
  deactivate(userId: string, fullView?: boolean): Promise<void | UserViewDTO>;
  delete(userId: string, fullView?: boolean): Promise<void | UserViewDTO>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
