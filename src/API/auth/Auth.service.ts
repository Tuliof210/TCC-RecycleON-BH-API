import { UserViewDTO } from 'src/shared/DTO';
import { IAuthService } from '.';
import { IUserService } from 'src/API/user';

import { Inject, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('UserService') private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email, true);
    const authUser = await (user ? user.authenticate(password) : undefined);
    return authUser ? authUser.view() : undefined;
  }

  async login(user: UserViewDTO) {
    const payload = { sub: user._id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }
}
