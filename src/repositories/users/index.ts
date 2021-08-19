import { User } from 'src/entities';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<void | User>;
  retrieveAll(query: any): Promise<{ count: number; data: User[] }>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
