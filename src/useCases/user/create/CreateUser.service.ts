import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/User';
import { CreateUserDTO } from './CreateUser.DTO';

import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { ICreateUserService } from '.';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(userData: CreateUserDTO) {
    const user = await this.constructUser(userData);
    return this.userRepository.save(user);
  }

  private async constructUser(userData: CreateUserDTO): Promise<User> {
    const password = await this.encryptPassword(userData.password);
    return new User({ ...userData, password });
  }

  private encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
