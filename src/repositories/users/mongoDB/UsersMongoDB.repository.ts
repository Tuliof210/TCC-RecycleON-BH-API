import { IUserRepository } from '..';
import { User } from 'src/shared/entities';
import { UserModel } from '.';
import { UpdateUserDTO } from 'src/shared/DTO';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(@InjectModel('User') private userModel: UserModel) {}

  async save(user: User, fullView = false) {
    const createdUser = await this.userModel.create(user);
    return createdUser.view(fullView);
  }

  async update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: userId, active: true }, userChanges, {
      new: true,
    });
    if (updatedUser) return updatedUser.view(fullView);

    throw { name: 'Not Found', message: `User ${userId} not found` };
  }

  async findOne(userQuery: Record<string, unknown>) {
    const foundUser = await this.userModel.findOne(userQuery);
    return foundUser?.view(true);
  }

  async getById(_id: string, fullView = false) {
    const foundUser = await this.findOne({ _id, active: true });
    if (foundUser) return foundUser.view(fullView);

    throw { name: 'Not Found', message: `User ${_id} not found` };
  }

  async getByEmail(email: string, fullView = false) {
    const foundUser = await this.findOne({ email });
    return foundUser?.view(fullView);
  }

  async retrieveAll(userQuery: Record<string, unknown>, fullView = false) {
    const countUsers = await this.userModel.countDocuments(userQuery);
    const retrievedUsers = await this.userModel.find(userQuery);
    return {
      count: countUsers,
      list: retrievedUsers.map((user) => user.view(fullView)),
    };
  }

  async deactivate(userId: string, fullView = false) {
    const foundUser = await this.getById(userId, true);
    const disabledUser = await foundUser.disable();
    return disabledUser.view(fullView);
  }

  async delete(userId: string, fullView = false) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: userId, active: true });
    if (deletedUser) return deletedUser.view(fullView);

    throw { name: 'Not Found', message: `User ${userId} not found` };
  }
}
