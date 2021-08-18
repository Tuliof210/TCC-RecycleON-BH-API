import { IUserRepository } from '../IUsersRepository';
import { User } from 'src/entities/User';

export class LocalUsersRepository implements IUserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }

  async findByKey(key: string, value: unknown): Promise<User | void> {
    const user = this.users.find((userLocal) => userLocal[key] === value);
    return Promise.resolve(user);
  }

  async retrieveAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}
