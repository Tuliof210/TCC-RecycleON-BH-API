import { v4 as uuidV4 } from 'uuid';

class Entity {
  public readonly _id: string;

  constructor() {
    this._id = uuidV4();
  }
}

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;
  public active: boolean;

  constructor(props: Omit<User, '_id' | 'active'>) {
    super();
    this.active = true;

    Object.assign(this, props);
  }
}
