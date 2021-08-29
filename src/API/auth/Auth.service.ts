import { AuthPayloadDTO } from 'src/shared/DTO';
import { IAuthService } from '.';
import { IUserService, IUserServiceToken } from 'src/API/user';

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserServiceToken) private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    const authUser = await (user ? user.authenticate(password) : undefined);
    return authUser ? authUser : undefined;
  }

  async login(payload: AuthPayloadDTO) {
    return { token: this.jwtService.sign(payload) };
  }
}
