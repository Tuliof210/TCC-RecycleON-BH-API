import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection } from '.';
import { UpdateUserDTO } from 'src/DTO';

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

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

  async findById(userId: string) {
    return this.UserModel.findOne({ _id: userId, active: true }).catch((err) => {
      throw {
        name: err.name,
        message: err.message,
      };
    });
  }

  async retrieveAll(userQuery: any) {
    return this.UserModel.countDocuments(userQuery)
      .then((count) => this.UserModel.find(userQuery).then((data) => ({ count, data })))
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }

  async update(userId: string, userChanges: UpdateUserDTO) {
    return this.UserModel.findOneAndUpdate({ _id: userId }, userChanges, { new: true });
  }
}
