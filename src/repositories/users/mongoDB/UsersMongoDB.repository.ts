import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection, UserDocument } from '.';
import { UpdateUserDTO } from 'src/DTO';

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(@InjectModel(UserCollection) private UserModel: Model<UserDocument>) {}

  async save(user: User) {
    return this.UserModel.create(user)
      .then((createdUser) => createdUser.view())
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
          statusCode: HttpStatus.CONFLICT,
        };
      });
  }

  async findById(userId: string) {
    return this.UserModel.findOne({ _id: userId, active: true })
      .then((foundUser) => foundUser?.view())
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }

  async retrieveAll(userQuery: any) {
    return this.UserModel.countDocuments(userQuery)
      .then((countUsers) =>
        this.UserModel.find(userQuery).then((retrievedUsers) => ({
          count: countUsers,
          data: retrievedUsers.map((user) => user.view()),
        })),
      )
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }

  async update(userId: string, userChanges: UpdateUserDTO) {
    return this.UserModel.findOneAndUpdate({ _id: userId }, userChanges, { new: true }).then((updatedUser) =>
      updatedUser?.view(),
    );
  }
}
