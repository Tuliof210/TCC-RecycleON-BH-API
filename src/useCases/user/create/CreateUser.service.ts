import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/entities/User';
import { ICreateUserDTO } from './CreateUser.DTO';

import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(userData: ICreateUserDTO): Promise<User> {
    const user = await this.constructUser(userData);
    return this.userRepository.save(user);
  }

  private async constructUser(userData: ICreateUserDTO): Promise<User> {
    const password = await this.encryptPassword(userData.password);
    return new User({ ...userData, password });
  }

  private encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
