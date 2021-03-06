import { Entity } from '.';
import { CreateWikiItemDTO } from 'src/shared/DTO';

export enum WikiItemType {
  location = 'location',
  material = 'material',
}

export class WikiItem extends Entity {
  public type: string;
  public tag: string;

  public about: string;
  public relatedItems: Array<string>;

  public keyWords: Array<string>;

  constructor(props: CreateWikiItemDTO) {
    super();
    Object.assign(this, props);

    this.relatedItems = [];
    this.keyWords = [];

    this.about = '';
  }
}
