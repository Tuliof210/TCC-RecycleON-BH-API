import { User } from 'src/entities';
import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';
import { IUserService } from '.';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  create(userData: CreateUserDTO) {
    const user = new User(userData);
    return this.userRepository.save(user);
  }

  update(userId: string, userChanges: UpdateUserDTO) {
    return this.userRepository.update(userId, userChanges);
  }

  retrieve(userQuery: any) {
    return this.userRepository.retrieveAll(userQuery);
  }

  getOne(userId: string) {
    return this.userRepository.findById(userId);
  }

  disable(userId: string) {
    return this.userRepository.deactivate(userId);
  }

  delete(userId: string) {
    return this.userRepository.delete(userId);
  }
}
