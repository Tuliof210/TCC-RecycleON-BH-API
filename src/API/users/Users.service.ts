import { User } from 'src/shared/entities';

import { IUsersService } from '.';
import { IUsersRepository, IUsersRepositoryToken } from 'src/repositories/users';
import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService implements IUsersService {
  constructor(@Inject(IUsersRepositoryToken) private readonly usersRepository: IUsersRepository) {}

  create(userData: CreateUserDTO, fullView = false) {
    const user = new User(userData);
    return this.usersRepository.save(user, fullView);
  }

  async updateMe(user: UserDocumentDTO, userChanges: UpdateUserDTO, fullView = false) {
    const updatedMe = await user.set(userChanges).save();
    return updatedMe.view(fullView);
  }

  update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    return this.usersRepository.update(userId, userChanges, fullView);
  }

  retrieve(userQuery: QueryParamsDTO, fullView = false) {
    return this.usersRepository.retrieveAll(userQuery, fullView);
  }

  getMe(user: UserDocumentDTO, fullView = false) {
    return user.view(fullView);
  }

  getById(userId: string, fullView = false) {
    return this.usersRepository.getById(userId, fullView);
  }

  getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async disableMe(user: UserDocumentDTO, fullView = false) {
    const me = await user.disable();
    return me.view(fullView);
  }

  disable(userId: string, fullView = false) {
    return this.usersRepository.deactivate(userId, fullView);
  }

  delete(userId: string, fullView = false) {
    return this.usersRepository.delete(userId, fullView);
  }
}
