import { WikiDTO } from 'src/shared/DTO';
import { WikiType } from 'src/shared/entities';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'wiki' })
class WikiProps extends Document implements WikiDTO {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, enum: WikiType })
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

export const WikiSchema = SchemaFactory.createForClass(WikiProps);
export const WikiCollection = 'Wiki';
export type WikiModel = Model<WikiDTO, Document>;

//=================================================================================

WikiSchema.methods.view = function (fullView = false): WikiDTO {
  const wikiView = {};
  const publicKeys = ['_id', 'tag', 'type', 'keyWords'];
  const privateKeys = [...publicKeys, 'about', 'relatedItens'];

  const mountWikiView = (key: string) => {
    wikiView[key] = this[key];
  };

  if (fullView) privateKeys.forEach(mountWikiView);
  else publicKeys.forEach(mountWikiView);

  return wikiView;
};
