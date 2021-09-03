import { IUserRepository } from '..';
import { User } from 'src/shared/entities';
import { UserModel } from '.';
import { QueryParamsDTO, UpdateUserDTO, UserDocumentDTO, UserDTO } from 'src/shared/DTO';
import { UserCollection } from './UserMongoDB.schema';
import { CustomError } from 'src/shared/classes';

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
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: userId, active: true }, userChanges, {
        new: true,
      })
      .exec();
    if (updatedUser) return updatedUser.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `User ${userId} not found` });
  }

  findOne(userQuery: Record<string, unknown>): Promise<void | UserDocumentDTO> {
    return this.userModel.findOne(userQuery).exec();
  }

  getByEmail(email: string) {
    return this.findOne({ email });
  }

  async getById(_id: string, fullView = false) {
    const foundUser = await this.findOne({ _id, active: true });
    if (foundUser) return foundUser.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `User ${_id} not found` });
  }

  async retrieveAll({ query, select, cursor }: QueryParamsDTO, fullView = false) {
    const countUsers = await this.userModel.countDocuments(query).exec();
    const retrievedUsers = await this.userModel.find(query, select, cursor).exec();

    return {
      count: countUsers,
      list: retrievedUsers.map((user) => user.view(fullView)),
    };
  }

  async deactivate(_id: string, fullView = false) {
    const foundUser = await this.findOne({ _id, active: true });
    if (foundUser) {
      const disabledUser = await foundUser.disable();
      return disabledUser.view(fullView);
    }

    throw new CustomError({ name: 'Not Found', message: `User ${_id} not found` });
  }

  async delete(userId: string, fullView = false) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: userId }).exec();
    if (deletedUser) return deletedUser.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `User ${userId} not found` });
  }
}
