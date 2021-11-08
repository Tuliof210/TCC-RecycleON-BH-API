import { IUsersRepository } from '..';
import { User } from 'src/shared/entities';
import { UserModel } from '.';
import { QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';
import { UserCollection } from './UserMongoDB.schema';
import { CustomError } from 'src/shared/classes';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersMongoDBRepository implements IUsersRepository {
  constructor(@InjectModel(UserCollection) private userModel: UserModel) {}

  async save(user: User) {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async update(userId: string, userChanges: UpdateUserDTO) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: userId, active: true }, userChanges, {
        new: true,
      })
      .exec();
    if (updatedUser) return updatedUser;

    throw new CustomError({ name: 'Not Found', message: `User ${userId} not found` });
  }

  findOne(userQuery: Record<string, unknown>): Promise<void | UserDocumentDTO> {
    return this.userModel.findOne(userQuery).exec();
  }

  getByEmail(email: string) {
    return this.findOne({ email });
  }

  getBySocialId(socialId: string, brand: string) {
    return this.findOne({ [`socialId.${brand}`]: socialId });
  }

  async getById(_id: string) {
    const foundUser = await this.findOne({ _id, active: true });
    if (foundUser) return foundUser;

    throw new CustomError({ name: 'Not Found', message: `User ${_id} not found` });
  }

  async retrieveAll({ query, select, cursor }: QueryParamsDTO) {
    const countUsers = await this.userModel.countDocuments(query).exec();
    const retrievedUsers = await this.userModel.find(query, select, cursor).exec();
    return {
      count: countUsers,
      list: retrievedUsers,
    };
  }

  async deactivate(_id: string) {
    const foundUser = await this.findOne({ _id, active: true });
    if (foundUser) {
      const disabledUser = await foundUser.disable();
      return disabledUser;
    }

    throw new CustomError({ name: 'Not Found', message: `User ${_id} not found` });
  }

  async delete(userId: string) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: userId }).exec();
    if (deletedUser) return deletedUser;

    throw new CustomError({ name: 'Not Found', message: `User ${userId} not found` });
  }
}
