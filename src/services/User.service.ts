import { User } from 'src/entities';
import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/DTO';
import { IUserService } from '.';
import { IUserRepository } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('UserRespository') private readonly userRepository: IUserRepository) {}

  create(userData: CreateUserDTO) {
    const user = new User(userData);
    return this.userRepository.save(user);
  }

  update(userId: string, userChanges: UpdateUserDTO) {
    return this.userRepository.update(userId, userChanges);
  }

  findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  findOne(user: UserViewDTO) {
    return this.userRepository.findOne(user);
  }

  retrieve(userQuery: any) {
    return this.userRepository.retrieveAll(userQuery);
  }

  disable(userId: string) {
    return this.userRepository.deactivate(userId);
  }

  delete(userId: string) {
    return this.userRepository.delete(userId);
  }
}
