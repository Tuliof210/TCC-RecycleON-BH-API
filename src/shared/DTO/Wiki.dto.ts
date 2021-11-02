import { WikiItem } from 'src/shared/entities';
import { Document } from 'mongoose';

export type CreateWikiItemDTO = Pick<WikiItem, 'type' | 'tag'>;

export interface WikiItemDTO extends Partial<WikiItem> {
  _id?: any;
  view?: (fullView?: boolean) => WikiItem;
}
export type WikiItemDocumentDTO = WikiItemDTO & Document<any, any, WikiItemDTO>;
