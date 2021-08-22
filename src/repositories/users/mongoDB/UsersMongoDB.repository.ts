import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection, UserModel } from '.';
import { UpdateUserDTO } from 'src/DTO';

import { HTTP_ERROR_STATUS_HELPER, IHttpErrorStatusHelper } from 'src/helpers';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(
    @InjectModel(UserCollection) private userModel: UserModel,
    @Inject(HTTP_ERROR_STATUS_HELPER) private readonly httpErrorStatusHelper: IHttpErrorStatusHelper,
  ) {}

  save(user: User, fullView = false) {
    return this.userModel
      .create(user)
      .then((createdUser) => createdUser.view(fullView))
      .catch((e) => {
        throw {
          name: e.name,
          message: e.message,
          statusCode: this.httpErrorStatusHelper.get(e),
        };
      });
  }

  findById(userId: string, fullView = false) {
    return this.userModel
      .findOne({ _id: userId, active: true })
      .then((foundUser) => {
        if (foundUser) return foundUser.view(fullView);
        throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
      })
      .catch((e) => {
        throw {
          name: e.name,
          message: e.message,
          statusCode: e.statusCode ?? this.httpErrorStatusHelper.get(e),
        };
      });
  }

  retrieveAll(userQuery: any, fullView = false) {
    return this.userModel
      .countDocuments(userQuery)
      .then((countUsers) =>
        this.userModel.find(userQuery).then((retrievedUsers) => ({
          count: countUsers,
          list: retrievedUsers.map((user) => user.view(fullView)),
        })),
      )
      .catch((e) => {
        throw {
          name: e.name,
          message: e.message,
          statusCode: e.statusCode ?? this.httpErrorStatusHelper.get(e),
        };
      });
  }

  update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    return this.userModel
      .findOneAndUpdate({ _id: userId, active: true }, userChanges, { new: true })
      .then((updatedUser) => {
        console.log(updatedUser);

        if (updatedUser) return updatedUser.view(fullView);
        throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
      })
      .catch((e) => {
        console.log(e);

        throw {
          name: e.name,
          message: e.message,
          statusCode: e.statusCode ?? this.httpErrorStatusHelper.get(e),
        };
      });
  }

  deactivate(userId: string, fullView = false) {
    return this.findById(userId, true)
      .then((foundUser) => foundUser.disable())
      .then((disabledUser) => disabledUser.view(fullView))
      .catch((e) => {
        console.log(e);

        throw {
          name: e.name,
          message: e.message,
          statusCode: e.statusCode ?? this.httpErrorStatusHelper.get(e),
        };
      });
  }

  delete(userId: string, fullView = false) {
    return this.userModel
      .findOneAndDelete({ _id: userId, active: true })
      .then((deletedUser) => {
        console.log(deletedUser);

        if (deletedUser) return deletedUser.view(fullView);
        throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
      })
      .catch((e) => {
        console.log(e);

        throw {
          name: e.name,
          message: e.message,
          statusCode: e.statusCode ?? this.httpErrorStatusHelper.get(e),
        };
      });
  }
}
