import { UpdateUserDTO } from 'src/DTO';
import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(userId: string, userChanges: UpdateUserDTO) {
    return this.userRepository.update(userId, userChanges);
  }
}
