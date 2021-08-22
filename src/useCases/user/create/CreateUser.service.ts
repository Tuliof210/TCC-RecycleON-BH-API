import { CreateUserDTO } from 'src/DTO';
import { ICreateUserService } from '.';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';
import { User } from 'src/entities';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  execute(userData: CreateUserDTO) {
    const user = new User(userData);
    return this.userRepository.save(user);
  }
}
