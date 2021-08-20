import { IGetUserService } from '.';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserService implements IGetUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(userId: string) {
    return this.userRepository.findById(userId);
  }
}
