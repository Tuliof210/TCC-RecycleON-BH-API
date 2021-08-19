import { User } from 'src/entities';

export const USER_REPOSITORY = 'USER REPOSITORY';
export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | void>;
  retrieveAll(query?: any): Promise<{ count: number; data: User[] }>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
