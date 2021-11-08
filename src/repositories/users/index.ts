import { User } from 'src/shared/entities';
import { UserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';

export interface IUsersRepository {
  save(user: User): Promise<UserDTO>;
  update(userId: string, userChanges: UpdateUserDTO): Promise<UserDTO>;

  findOne(userQuery: Record<string, unknown>): Promise<void | UserDocumentDTO>;
  getById(_id: string): Promise<UserDTO>;
  getBySocialId(socialId: string, brand: string): Promise<void | UserDTO>;
  getByEmail(email: string): Promise<void | UserDTO>;
  retrieveAll(userQuery: QueryParamsDTO): Promise<{ count: number; list: Array<UserDTO> }>;

  deactivate(userId: string): Promise<UserDTO>;
  delete(userId: string): Promise<UserDTO>;
}
export const IUsersRepositoryToken = 'IUsersRepositoryToken';
