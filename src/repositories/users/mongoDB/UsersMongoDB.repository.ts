import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUserRepository } from '..';
import { UserCollection } from './User.schema';
import { User } from 'src/entities/User';

import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  //constructor(@InjectModel(UserCollection) private UserModel: Model<typeof UserSchema>) {}
  constructor(@InjectModel(UserCollection) private UserModel: Model<User>) {}

  async save(user: User) {
    return this.UserModel.create(user).catch((err) => {
      throw {
        name: err.name,
        message: err.message,
        statusCode: HttpStatus.CONFLICT,
      };
    });
  }

  async findById(_id: string) {
    return this.UserModel.findOne({ _id, active: true }).catch((err) => {
      throw {
        name: err.name,
        message: err.message,
      };
    });
  }

  async retrieveAll(query: any) {
    return this.UserModel.countDocuments(query)
      .then((count) => this.UserModel.find(query).then((data) => ({ count, data })))
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }
}
