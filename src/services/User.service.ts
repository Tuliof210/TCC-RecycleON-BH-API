import { User } from 'src/entities';
import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';
import { IUserService } from '.';
import { IUserRepository } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('UserRespository') private readonly userRepository: IUserRepository) {}

  create(userData: CreateUserDTO, fullView = false) {
    const user = new User(userData);
    return this.userRepository.save(user, fullView);
  }

  update(userId: string, userChanges: UpdateUserDTO, fullView = false) {
    return this.userRepository.update(userId, userChanges, fullView);
  }

  findById(userId: string, fullView = false) {
    return this.userRepository.findById(userId, fullView);
  }

  findByEmail(email: string, fullView = false) {
    return this.userRepository.findByEmail(email, fullView);
  }

  retrieve(userQuery: Record<string, unknown>, fullView = false) {
    return this.userRepository.retrieveAll(userQuery, fullView);
  }

  disable(userId: string, fullView = false) {
    return this.userRepository.deactivate(userId, fullView);
  }

  delete(userId: string, fullView = false) {
    return this.userRepository.delete(userId, fullView);
  }
}
