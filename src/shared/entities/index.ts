import { v4 as uuidV4 } from 'uuid';

export class Entity {
  public readonly _id: string;
  constructor() {
    this._id = uuidV4();
  }
}

export { roles, User } from './User';
