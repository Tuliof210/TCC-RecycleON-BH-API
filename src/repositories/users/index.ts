import { User } from 'src/entities';
import { UserViewDTO, UpdateUserDTO } from 'src/DTO';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository {
  save(user: User): Promise<UserViewDTO>;
  findById(userId: string): Promise<void | UserViewDTO>;
  retrieveAll(userQuery?: any): Promise<{ count: number; data: UserViewDTO[] }>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserViewDTO>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
