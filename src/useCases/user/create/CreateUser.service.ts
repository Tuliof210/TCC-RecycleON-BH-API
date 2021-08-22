import { CreateUserDTO } from 'src/DTO';
import { ICreateUserService } from '.';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';
import { User } from 'src/entities';

import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  execute(userData: CreateUserDTO) {
    const user = new User(userData);
    console.log(user);
    return this.userRepository.save(user);
  }

  private constructUser(userData: CreateUserDTO): User {
    const password = this.encryptPassword(userData.password);
    console.log(password);
    return new User({ ...userData, password });
  }

  private encryptPassword(password: string): string {
    const saltOrRounds = 10;
    return bcrypt.hashSync(password, saltOrRounds);
  }
}
