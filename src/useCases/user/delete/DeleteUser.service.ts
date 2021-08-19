import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

@Injectable()
export class DeleteUserController {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}
}
