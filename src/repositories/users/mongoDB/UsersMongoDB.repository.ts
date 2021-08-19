import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserCollection } from './User.schema';

import { IUserRepository } from '..';
import { User } from 'src/entities/User';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  //constructor(@InjectModel(UserCollection) private UserModel: Model<typeof UserSchema>) {}
  constructor(@InjectModel(UserCollection) private UserModel: Model<User>) {}

  async save(user: User): Promise<User> {
    console.log('mongodb workflow');

    await this.UserModel.create(user)
      .then((created) => console.log(created))
      .catch((e) => console.log(e));
    return Promise.resolve(user);
  }

  async findById(id: string): Promise<User | void> {
    console.log('mongodb workflow');
    return Promise.resolve();
  }

  async retrieveAll(): Promise<User[]> {
    console.log('mongodb workflow');
    const users: User[] = [];
    return Promise.resolve(users);
  }
}
