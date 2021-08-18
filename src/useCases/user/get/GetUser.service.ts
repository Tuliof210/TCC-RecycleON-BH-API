import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { User } from 'src/entities/User';

@Injectable()
export class GetUserService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<User | void> {
    return this.userRepository.findById(id);
  }
}
