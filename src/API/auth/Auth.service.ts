import { IAuthService } from '.';
import { IUserService } from 'src/API/user';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email, true);
    return user && user.password === password ? user.view() : undefined;
  }
}
