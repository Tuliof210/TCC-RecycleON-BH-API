import { User } from 'src/shared/entities';
import { UserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';

export interface IUserRepository {
  save(user: User, fullView?: boolean): Promise<UserDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDTO>;

  findOne(userQuery: Record<string, unknown>): Promise<void | UserDocumentDTO>;
  getById(_id: string, fullView?: boolean): Promise<UserDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserDTO>;
  retrieveAll(userQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<UserDTO> }>;

  deactivate(userId: string, fullView?: boolean): Promise<UserDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserDTO>;
}
export const IUserRepositoryToken = 'IUserRepositoryToken';
