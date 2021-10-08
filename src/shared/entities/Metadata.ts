import { Entity } from '.';
import { CreateMetadataDTO } from 'src/shared/DTO';

export enum MetadataType {
  location = 'location',
  material = 'material',
}

export class Metadata extends Entity {
  public type: string;
  public tag: string;

  public about: string;
  public relatedItens: Array<string>;

  public keyWords: Array<string>;

  constructor(props: CreateMetadataDTO) {
    super();
    Object.assign(this, props);

    this.relatedItens = [];
    this.keyWords = [];

    this.about = '';
  }
}
