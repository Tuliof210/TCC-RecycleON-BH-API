import { AuthPayloadDTO, UserDTO } from 'src/shared/DTO';
import { IAuthService } from '.';

import { IUsersRepository, IUsersRepositoryToken } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUsersRepositoryToken) private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.getByEmail(email);
    if (user) return user.authenticate(password);
  }

  async signIn(user: UserDTO) {
    const payload: AuthPayloadDTO = { _id: user._id, email: user.email, role: user.role };
    return { token: this.jwtService.sign(payload), user };
  }
}
