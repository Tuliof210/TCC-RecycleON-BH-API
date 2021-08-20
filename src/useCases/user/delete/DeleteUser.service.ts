import { IDeleteUserService } from '.';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserService implements IDeleteUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  execute(userId: string) {
    return this.userRepository.delete(userId);
  }
}
