import { IUserRepository } from '..';
import { User } from 'src/entities';
import { UserCollection, UserModel } from '.';
import { UpdateUserDTO, UserViewDTO } from 'src/DTO';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoDBRepository implements IUserRepository {
  constructor(@InjectModel(UserCollection) private userModel: UserModel) {}

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

  async findById(_id: string, fullView = false) {
    const foundUser = await this.userModel.findOne({ _id, active: true });
    if (foundUser) return foundUser.view(fullView);

    throw { name: 'Not Found', message: `User ${_id} not found` };
  }

  async findByEmail(email: string, fullView = false) {
    const foundUser = await this.userModel.findOne({ email });
    if (foundUser) return foundUser.view(fullView);

    throw { name: 'Not Found', message: `User ${email} not found` };
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
    const foundUser = await this.findById(userId, true);
    const disabledUser = await foundUser.disable();
    return disabledUser.view(fullView);
  }

  async delete(userId: string, fullView = false) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: userId, active: true });
    if (deletedUser) return deletedUser.view(fullView);

    throw { name: 'Not Found', message: `User ${userId} not found` };
  }
}
