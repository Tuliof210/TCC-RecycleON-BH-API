import { Wiki } from 'src/shared/entities';
import { Document } from 'mongoose';

export type CreateWikiDTO = Pick<Wiki, 'type' | 'tag'>;

export interface WikiDTO extends Partial<Wiki> {
  _id?: any;
  view?: (fullView?: boolean) => Wiki;
}
export type WikiDocumentDTO = WikiDTO & Document<any, any, WikiDTO>;
