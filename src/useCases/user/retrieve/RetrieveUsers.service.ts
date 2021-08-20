import { IRetrieveUsersService } from '.';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RetrieveUsersService implements IRetrieveUsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(userQuery: any) {
    return this.userRepository.retrieveAll(userQuery);
  }
}
