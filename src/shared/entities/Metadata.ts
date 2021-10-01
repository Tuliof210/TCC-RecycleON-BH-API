import { Entity } from '.';
import { CreateMetadataDTO } from 'src/shared/DTO';

export enum MetadataTag {
  location = 'location',
  material = 'material',
}

export class Metadata extends Entity {
  public type: string;
  public tag: string;

  public related: Array<string>;

  constructor(props: CreateMetadataDTO) {
    super();
    Object.assign(this, props);
  }
}
