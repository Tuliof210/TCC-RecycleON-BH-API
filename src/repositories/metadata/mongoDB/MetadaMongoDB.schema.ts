import { MetadataDTO } from 'src/shared/DTO';
import { MetadataType } from 'src/shared/entities';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'metadata' })
class MetadataProps extends Document implements MetadataDTO {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, enum: MetadataType })
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

export const MetadataSchema = SchemaFactory.createForClass(MetadataProps);
export const MetadataCollection = 'Metadata';
export type MetadataModel = Model<MetadataDTO, Document>;

//=================================================================================

MetadataSchema.methods.view = function (fullView = false): MetadataDTO {
  const metadataView = {};
  const publicKeys = ['_id', 'tag', 'type', 'keyWords'];
  const privateKeys = [...publicKeys, 'about', 'relatedItens'];

  const mountMetadataView = (key: string) => {
    metadataView[key] = this[key];
  };

  if (fullView) privateKeys.forEach(mountMetadataView);
  else publicKeys.forEach(mountMetadataView);

  return metadataView;
};
