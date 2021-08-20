import { User } from 'src/entities';
import { UpdateUserDTO } from 'src/DTO';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(userId: string): Promise<void | User>;
  retrieveAll(userQuery?: any): Promise<{ count: number; data: User[] }>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<User>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
