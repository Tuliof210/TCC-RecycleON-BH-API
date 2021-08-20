import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UpdateUserDTO } from 'src/DTO';

export class UserMemoryRepository implements IUserRepository {
  private readonly users: User[] = [];

  async save(user: User) {
    this.users.push(user);
    return Promise.resolve(user);
  }

  async findById(userId: string) {
    const user = this.users.find((userLocal) => userLocal._id === userId);
    return Promise.resolve(user);
  }

  async retrieveAll() {
    return Promise.resolve({ count: this.users.length, data: this.users });
  }

  async update(userId: string, userChanges: UpdateUserDTO) {
    return Promise.resolve(this.users[0]);
  }
}
