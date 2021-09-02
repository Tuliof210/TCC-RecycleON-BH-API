import { AuthPayloadDTO } from 'src/shared/DTO';
import { IAuthService } from '.';

import { IUserRepository, IUserRepositoryToken } from 'src/repositories/user';

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);
    if (user) return user.authenticate(password);
  }

  async login(payload: AuthPayloadDTO) {
    return { token: this.jwtService.sign(payload) };
  }
}
