import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection, UserModel } from '.';
import { UpdateUserDTO } from 'src/DTO';

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(@InjectModel(UserCollection) private userModel: UserModel) {}

  save(user: User, fullView = false) {
    return this.userModel
      .create(user)
      .then((createdUser) => createdUser.view(fullView))
      .catch((e) => {
        console.log(e);

        throw { name: e.name, message: e.message, statusCode: HttpStatus.CONFLICT };
      });
  }

  findById(userId: string, fullView = false) {
    return this.userModel
      .findOne({ _id: userId, active: true })
      .then((foundUser) => {
        console.log(foundUser);

        if (foundUser) return foundUser.view(fullView);
        throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
      })
      .catch((e) => {
        console.log(e);

        throw { name: e.name, message: e.message };
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
        console.log(e);

        throw { name: e.name, message: e.message };
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

        throw { name: e.name, message: e.message };
      });
  }

  deactivate(userId: string, fullView = false) {
    return this.findById(userId, true)
      .then((foundUser) => foundUser.disable())
      .then((disabledUser) => disabledUser.view(fullView))
      .catch((e) => {
        console.log(e);

        throw { name: e.name, message: e.message };
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

        throw { name: e.name, message: e.message };
      });
  }
}
