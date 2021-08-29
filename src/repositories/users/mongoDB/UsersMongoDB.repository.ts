import { IUserRepository } from '..';
import { User } from 'src/shared/entities';
import { UserModel } from '.';
import { UpdateUserDTO, UserViewDTO } from 'src/shared/DTO';
import { UserCollection } from './UserMongoDB.schema';
import { CustomError } from 'src/shared/classes';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(@InjectModel(UserCollection) private userModel: UserModel) {}

  async save(user: User, fullView = false) {
    const createdUser = await this.userModel.create(user);
    return createdUser.view(fullView);
  }

  async update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: userId, active: true }, userChanges, {
        new: true,
      })
      .exec();
    if (updatedUser) return updatedUser.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `User ${userId} not found` });
  }

  async findOne(userQuery: Record<string, unknown>) {
    const foundUser = await this.userModel.findOne(userQuery).exec();
    return foundUser?.view(true);
  }

  async getById(_id: string, fullView = false) {
    const foundUser = await this.findOne({ _id, active: true });
    if (foundUser) return foundUser.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `User ${_id} not found` });
  }

  async getByEmail(email: string, fullView = false) {
    const foundUser = await this.findOne({ email });
    return foundUser?.view(fullView);
  }

  async retrieveAll(userQuery: Record<string, unknown>, fullView = false) {
    const countUsers = await this.userModel.countDocuments(userQuery).exec();
    const retrievedUsers = await this.userModel.find(userQuery).exec();
    const mountUserList = (user: UserViewDTO & Document<any, any, UserViewDTO>) => user.view(fullView);
    return {
      count: countUsers,
      list: retrievedUsers.map(mountUserList),
    };
  }

  async deactivate(userId: string, fullView = false) {
    const foundUser = await this.getById(userId, true);
    const disabledUser = await foundUser.disable();
    return disabledUser.view(fullView);
  }

  async delete(userId: string, fullView = false) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: userId }).exec();
    if (deletedUser) return deletedUser.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `User ${userId} not found` });
  }
}
