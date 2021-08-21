import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection, UserModel } from '.';
import { UpdateUserDTO } from 'src/DTO';

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(@InjectModel(UserCollection) private userModel: UserModel) {}

  async save(user: User, fullView = false) {
    return this.userModel
      .create(user)
      .then((createdUser) => createdUser.view(fullView))
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
          statusCode: HttpStatus.CONFLICT,
        };
      });
  }

  async findById(userId: string, fullView = false) {
    return this.userModel
      .findOne({ _id: userId, active: true })
      .then((foundUser) => foundUser?.view(fullView))
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }

  async retrieveAll(userQuery: any, fullView = false) {
    return this.userModel
      .countDocuments(userQuery)
      .then((countUsers) =>
        this.userModel.find(userQuery).then((retrievedUsers) => ({
          count: countUsers,
          data: retrievedUsers.map((user) => user.view(fullView)),
        })),
      )
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }

  async update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    return this.userModel
      .findOneAndUpdate({ _id: userId, active: true }, userChanges, { new: true })
      .then((updatedUser) => updatedUser?.view(fullView))
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }

  async deactivate(userId: string, fullView = false) {
    return this.findById(userId, true)
      .then((foundUser) => foundUser?.disable())
      .then((disabledUser) => disabledUser?.view(fullView));
  }

  async delete(userId: string, fullView = false) {
    return this.userModel
      .findOneAndDelete({ _id: userId, active: true })
      .then((deletedUser) => deletedUser?.view(fullView))
      .catch((err) => {
        throw {
          name: err.name,
          message: err.message,
        };
      });
  }
}
