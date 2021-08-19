import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserCollection } from './User.schema';

import { IUserRepository } from '..';
import { User } from 'src/entities/User';

import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  //constructor(@InjectModel(UserCollection) private UserModel: Model<typeof UserSchema>) {}
  constructor(@InjectModel(UserCollection) private UserModel: Model<User>) {}

  async save(user: User): Promise<User> {
    return this.UserModel.create({ ...user, _id: '50ad4615-d75e-4f41-baed-56f6a1682db2' })
      .then((created) => {
        console.log(`Created: ${created._id}`);
        return created;
      })
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
          statusCode: HttpStatus.CONFLICT,
        };
      });
  }

  async findById(id: string): Promise<User | void> {
    return Promise.resolve();
  }

  async retrieveAll(): Promise<User[]> {
    const users: User[] = [];
    return Promise.resolve(users);
  }
}
