import { IUserRepository } from '..';
import { User } from 'src/entities/User';

export class UserMongoDBRepository implements IUserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<User> {
    console.log('mongodb workflow');

    this.users.push(user);
    return Promise.resolve(user);
  }

  async findById(id: string): Promise<User | void> {
    console.log('mongodb workflow');

    const user = this.users.find((userLocal) => userLocal.id === id);
    return Promise.resolve(user);
  }

  async retrieveAll(): Promise<User[]> {
    console.log('mongodb workflow');

    return Promise.resolve(this.users);
  }
}
