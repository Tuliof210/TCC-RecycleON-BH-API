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
  public role: string;
  public active: boolean;

  constructor(props: Omit<User, '_id' | 'active' | 'role'>, isAdmin = false) {
    super();
    this.active = true;
    this.role = isAdmin ? 'admin' : 'user';

    Object.assign(this, props);
  }
}
