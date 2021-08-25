import { UserViewDTO } from 'src/DTO';
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
    return user && user.password === password ? user.view() : undefined;
  }

  async login(user: UserViewDTO) {
    const payload = { email: user.email, sub: user._id };
    return { token: this.jwtService.sign(payload) };
  }
}
