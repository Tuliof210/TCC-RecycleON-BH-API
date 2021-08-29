import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';

export interface IUserController {
  create(masterKey: string, userData: CreateUserDTO): Promise<UserDocumentDTO>;
  updateMe({ user }: { user: UserDocumentDTO }, userChanges: UpdateUserDTO): Promise<UserDocumentDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserDocumentDTO>;

  retrieve(userQuery: QueryParamsDTO): Promise<{ count: number; list: UserDocumentDTO[] }>;
  getMe({ user }: { user: UserDocumentDTO }): UserDocumentDTO;
  get(userId: string): Promise<UserDocumentDTO>;

  disableMe({ user }: { user: UserDocumentDTO }): Promise<UserDocumentDTO>;
  disable(userId: string): Promise<UserDocumentDTO>;
  delete(userId: string): Promise<UserDocumentDTO>;
}

export interface IUserService {
  create(userData: CreateUserDTO, fullView?: boolean): Promise<UserDocumentDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDocumentDTO>;

  retrieve(userQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: UserDocumentDTO[] }>;
  getById(userId: string, fullView?: boolean): Promise<UserDocumentDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserDocumentDTO>;

  disable(userId: string, fullView?: boolean): Promise<UserDocumentDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserDocumentDTO>;
}
export const IUserServiceToken = 'IUserServiceToken';

export { UserModule } from './User.module';
