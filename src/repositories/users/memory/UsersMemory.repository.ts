import { IUserRepository } from '..';
import { User } from 'src/entities/User';

export class UserMemoryRepository implements IUserRepository {
  private readonly users: User[] = [];

  async save(user: User) {
    this.users.push(user);
    return Promise.resolve(user);
  }

  async findById(id: string) {
    const user = this.users.find((userLocal) => userLocal._id === id);
    return Promise.resolve(user);
  }

  async retrieveAll() {
    return Promise.resolve({ count: this.users.length, data: this.users });
  }
}
