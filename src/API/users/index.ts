import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDTO, UserDocumentDTO, SocialUserDTO } from 'src/shared/DTO';

export interface IUsersController {
  create(userData: CreateUserDTO): Promise<{ token: string; user: UserDTO }>;
  createFacebook(userSocialData: SocialUserDTO): Promise<{ token: string; user: UserDTO }>;
  createGoogle(userSocialData: SocialUserDTO): Promise<{ token: string; user: UserDTO }>;

  updateMe({ user }: { user: UserDocumentDTO }, userChanges: UpdateUserDTO): Promise<UserDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserDTO>;

  retrieve(userQuery: QueryParamsDTO): Promise<{ count: number; list: Array<UserDTO> }>;
  turnIntoAdmin(userId: string): Promise<UserDTO>;

  getMe({ user }: { user: UserDocumentDTO }): UserDTO;
  get(userId: string): Promise<UserDTO>;

  disableMe({ user }: { user: UserDocumentDTO }): Promise<UserDTO>;
  disable(userId: string): Promise<UserDTO>;
  delete(userId: string): Promise<UserDTO>;
}

export interface IUsersService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserDTO>;
  createSocial(userSocialData: SocialUserDTO, brand: 'facebook' | 'google', fullView?: boolean): Promise<UserDTO>;

  updateMe(user: UserDocumentDTO, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDTO>;

  retrieve(userQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<UserDTO> }>;
  getMe(user: UserDocumentDTO, fullView?: boolean): UserDTO;
  getById(userId: string, fullView?: boolean): Promise<UserDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserDTO>;

  disableMe(user: UserDocumentDTO, fullView?: boolean): Promise<UserDTO>;
  disable(userId: string, fullView?: boolean): Promise<UserDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserDTO>;
}
export const IUsersServiceToken = 'IUsersServiceToken';

export { UsersModule } from './Users.module';
