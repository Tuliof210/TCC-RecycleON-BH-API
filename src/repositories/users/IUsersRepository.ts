import { User } from '../../entities/User';

export const USER_REPOSITORY = 'USER REPOSITORY';
export interface IUserRepository {
  save(user: User): Promise<User>;
  findByKey(key: string, value: unknown): Promise<User | void>;
  retrieveAll(): Promise<User[]>;
}

// javascript não possui interfaces
// necessario fazer gambiarra
