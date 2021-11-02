import { Entity } from '.';
import { CreateWikiDTO } from 'src/shared/DTO';

export enum WikiType {
  location = 'location',
  material = 'material',
}

export class Wiki extends Entity {
  public type: string;
  public tag: string;

  public about: string;
  public relatedItens: Array<string>;

  public keyWords: Array<string>;

  constructor(props: CreateWikiDTO) {
    super();
    Object.assign(this, props);

    this.relatedItens = [];
    this.keyWords = [];

    this.about = '';
  }
}
