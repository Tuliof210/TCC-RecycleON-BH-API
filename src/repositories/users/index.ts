import { User } from 'src/shared/entities';
import { UserDocumentDTO, QueryParamsDTO, UpdateUserDTO } from 'src/shared/DTO';

import { Document } from 'mongoose';

export interface IUserRepository {
  save(user: User, fullView?: boolean): Promise<UserDocumentDTO>;
  update(userId: string, userChanges: UpdateUserDTO, fullView?: boolean): Promise<UserDocumentDTO>;

  findOne(userQuery: Record<string, unknown>): Promise<void | (UserDocumentDTO & Document<any, any, UserDocumentDTO>)>;
  getById(_id: string, fullView?: boolean): Promise<UserDocumentDTO>;
  getByEmail(email: string, fullView?: boolean): Promise<void | UserDocumentDTO>;
  retrieveAll(userQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: UserDocumentDTO[] }>;

  deactivate(userId: string, fullView?: boolean): Promise<UserDocumentDTO>;
  delete(userId: string, fullView?: boolean): Promise<UserDocumentDTO>;
}
export const IUserRepositoryToken = 'IUserRepositoryToken';
