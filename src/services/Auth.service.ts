import { IAuthService, IUserService } from '.';
import { CreateUserDTO, LoginDTO } from 'src/DTO';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  async login(loginData: LoginDTO) {
    const user = await this.userService.findOne(loginData);
    if (user) return Promise.resolve({ token: '123', user });
    throw {};
  }

  signup(userData: CreateUserDTO) {
    return Promise.resolve({ token: '123', user: { name: 'name', email: 'email', password: 'password' } });
  }
}
