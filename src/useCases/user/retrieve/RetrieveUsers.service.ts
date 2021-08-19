import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RetrieveUsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(query: any) {
    return this.userRepository.retrieveAll(query);
  }
}
