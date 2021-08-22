import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection, UserModel } from '.';
import { UpdateUserDTO } from 'src/DTO';

import { REPOSITORY_HTTP_STATUS_HELPER, IRepositoryHttpStatusHelper } from 'src/helpers';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(
    @InjectModel(UserCollection) private userModel: UserModel,
    @Inject(REPOSITORY_HTTP_STATUS_HELPER) private readonly repositoryHttpStatusHelper: IRepositoryHttpStatusHelper,
  ) {}

  async save(user: User, fullView = false) {
    try {
      const createdUser = await this.userModel.create(user);
      return createdUser.view(fullView);
    } catch (e) {
      throw {
        name: e.name,
        message: e.message,
        statusCode: this.repositoryHttpStatusHelper.getError(e),
      };
    }
  }

  async findById(userId: string, fullView = false) {
    try {
      const foundUser = await this.userModel.findOne({ _id: userId, active: true });
      if (foundUser) return foundUser.view(fullView);

      throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
    } catch (e) {
      throw {
        name: e.name,
        message: e.message,
        statusCode: e.statusCode ?? this.repositoryHttpStatusHelper.getError(e),
      };
    }
  }

  async retrieveAll(userQuery: any, fullView = false) {
    try {
      const countUsers = await this.userModel.countDocuments(userQuery);
      const retrievedUsers = await this.userModel.find(userQuery);
      return {
        count: countUsers,
        list: retrievedUsers.map((user) => user.view(fullView)),
      };
    } catch (e) {
      throw {
        name: e.name,
        message: e.message,
        statusCode: e.statusCode ?? this.repositoryHttpStatusHelper.getError(e),
      };
    }
  }

  async update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate({ _id: userId, active: true }, userChanges, {
        new: true,
      });
      if (updatedUser) return updatedUser.view(fullView);

      throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
    } catch (e) {
      throw {
        name: e.name,
        message: e.message,
        statusCode: e.statusCode ?? this.repositoryHttpStatusHelper.getError(e),
      };
    }
  }

  async deactivate(userId: string, fullView = false) {
    try {
      const foundUser = await this.findById(userId, true);
      const disabledUser = await foundUser.disable();
      return disabledUser.view(fullView);
    } catch (e) {
      throw {
        name: e.name,
        message: e.message,
        statusCode: e.statusCode ?? this.repositoryHttpStatusHelper.getError(e),
      };
    }
  }

  async delete(userId: string, fullView = false) {
    try {
      const deletedUser = await this.userModel.findOneAndDelete({ _id: userId, active: true });
      if (deletedUser) return deletedUser.view(fullView);

      throw { name: 'Not Found', message: `User ${userId} not found`, statusCode: HttpStatus.NOT_FOUND };
    } catch (e) {
      throw {
        name: e.name,
        message: e.message,
        statusCode: e.statusCode ?? this.repositoryHttpStatusHelper.getError(e),
      };
    }
  }
}
