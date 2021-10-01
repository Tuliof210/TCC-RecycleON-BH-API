import { v4 as uuidV4 } from 'uuid';

export class Entity {
  public readonly _id: string;
  constructor() {
    this._id = uuidV4();
  }
}

export { Location, LocationTag } from './Location';
export { Metadata, MetadataTag } from './Metadata';
export { UserRole, User, EmailRegex, PasswordRegex } from './User';
