import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/entities/User';

import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

@Injectable()
export class GetUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(id: string) {
    return this.userRepository.findById(id);
  }
}
