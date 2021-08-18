import { v4 as uuidV4, validate as validateV4 } from 'uuid';

export class Entity {
  public readonly id: string;

  constructor(id?: string) {
    const isValid = validateV4(id);
    this.id = id && isValid ? id : uuidV4();
  }
}
