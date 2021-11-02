import { WikiItemDTO } from 'src/shared/DTO';
import { WikiItemType } from 'src/shared/entities';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'wiki' })
class WikiItemProps extends Document implements WikiItemDTO {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, enum: WikiItemType })
  type: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: false, default: '' })
  about: string;

  @Prop({ required: true, default: [] })
  relatedItens: Array<string>;

  @Prop({ required: true, default: [] })
  keyWords: Array<string>;
}

export const WikiItemSchema = SchemaFactory.createForClass(WikiItemProps);
export const WikiCollection = 'Wiki';
export type WikiItemModel = Model<WikiItemDTO, Document>;

//=================================================================================

WikiItemSchema.methods.view = function (fullView = false): WikiItemDTO {
  const wikiItemView = {};
  const publicKeys = ['_id', 'tag', 'type', 'keyWords'];
  const privateKeys = [...publicKeys, 'about', 'relatedItens'];

  const mountWikiItemView = (key: string) => {
    wikiItemView[key] = this[key];
  };

  if (fullView) privateKeys.forEach(mountWikiItemView);
  else publicKeys.forEach(mountWikiItemView);

  return wikiItemView;
};
