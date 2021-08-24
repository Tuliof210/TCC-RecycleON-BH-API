import { IAuthService } from '.';
import { IUserService } from 'src/API/user';
import { CreateUserDTO, LoginDTO } from 'src/DTO';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  async login({ email, password: pass }: LoginDTO) {
    const user = await this.userService.getByEmail(email, true);

    console.log(user, { email, pass });

    if (user && user.password === pass) return Promise.resolve({ token: '123', user });
    throw new UnauthorizedException();
  }

  signup(userData: CreateUserDTO) {
    return Promise.resolve({ token: '123', user: { name: 'name', email: 'email', password: 'password' } });
  }
}
