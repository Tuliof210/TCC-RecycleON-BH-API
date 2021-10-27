import { User } from 'src/shared/entities';

import { IUsersService } from '.';
import { IUsersRepository, IUsersRepositoryToken } from 'src/repositories/users';
import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService implements IUsersService {
  constructor(@Inject(IUsersRepositoryToken) private readonly usersRepository: IUsersRepository) {}

  async create(userData: CreateUserDTO, fullView = false) {
    const user = new User(userData);
    const createdUser = await this.usersRepository.save(user);
    return createdUser.view(fullView);
  }

  async updateMe(user: UserDocumentDTO, userChanges: UpdateUserDTO, fullView = false) {
    const updatedMe = await user.set(userChanges).save();
    return updatedMe.view(fullView);
  }

  async update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    const updatedUser = await this.usersRepository.update(userId, userChanges);
    return updatedUser.view(fullView);
  }

  async retrieve(userQuery: QueryParamsDTO, fullView = false) {
    const listOfUsers = await this.usersRepository.retrieveAll(userQuery);
    listOfUsers.list.map((user) => user.view(fullView));
    return listOfUsers;
  }

  getMe(user: UserDocumentDTO, fullView = false) {
    return user.view(fullView);
  }

  async getById(userId: string, fullView = false) {
    const foundUser = await this.usersRepository.getById(userId);
    return foundUser.view(fullView);
  }

  getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async disableMe(user: UserDocumentDTO, fullView = false) {
    const me = await user.disable();
    return me.view(fullView);
  }

  async disable(userId: string, fullView = false) {
    const disabledUser = await this.usersRepository.deactivate(userId);
    return disabledUser.view(fullView);
  }

  async delete(userId: string, fullView = false) {
    const deletedUser = await this.usersRepository.delete(userId);
    return deletedUser.view(fullView);
  }
}
