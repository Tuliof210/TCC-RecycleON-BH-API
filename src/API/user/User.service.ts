import { User } from 'src/shared/entities';

import { IUserService } from '.';
import { IUserRepository, IUserRepositoryToken } from 'src/repositories/user';
import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO, UserDTO } from 'src/shared/DTO';

import { Inject, Injectable } from '@nestjs/common';

import { Document } from 'mongoose';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  create(userData: CreateUserDTO, fullView = false) {
    const user = new User(userData);
    return this.userRepository.save(user, fullView);
  }

  async updateMe(user: UserDocumentDTO, userChanges: UpdateUserDTO, fullView = false) {
    const updatedMe = await user.set(userChanges).save();
    return updatedMe.view(fullView);
  }

  update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    return this.userRepository.update(userId, userChanges, fullView);
  }

  retrieve(userQuery: QueryParamsDTO, fullView = false) {
    return this.userRepository.retrieveAll(userQuery, fullView);
  }

  getById(userId: string, fullView = false) {
    return this.userRepository.getById(userId, fullView);
  }

  getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  disable(userId: string, fullView = false) {
    return this.userRepository.deactivate(userId, fullView);
  }

  delete(userId: string, fullView = false) {
    return this.userRepository.delete(userId, fullView);
  }
}
