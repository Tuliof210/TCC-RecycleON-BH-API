import { IUserRepository, USER_REPOSITORY } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserController {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}
}
