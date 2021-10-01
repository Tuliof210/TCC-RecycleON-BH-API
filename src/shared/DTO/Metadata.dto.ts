import { Metadata } from 'src/shared/entities';
import { Document } from 'mongoose';

export type CreateMetadataDTO = Pick<Metadata, 'tag'>;

export interface MetadataDTO extends Partial<Metadata> {
  _id?: any;
  view?: (fullView?: boolean) => Metadata;
}
export type MetadataDocumentDTO = MetadataDTO & Document<any, any, MetadataDTO>;
