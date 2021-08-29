import { User } from 'src/shared/entities';

import { IUserService } from '.';
import { IUserRepository, IUserRepositoryToken } from 'src/repositories/users';
import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO } from 'src/shared/DTO';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  create(userData: CreateUserDTO, fullView = false) {
    const user = new User(userData);
    return this.userRepository.save(user, fullView);
  }

  update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    return this.userRepository.update(userId, userChanges, fullView);
  }

  retrieve(userQuery: QueryParamsDTO, fullView = false) {
    console.log('inside service', userQuery);

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
