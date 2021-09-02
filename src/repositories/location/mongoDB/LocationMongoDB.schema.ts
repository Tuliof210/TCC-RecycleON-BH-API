import { LocationDocumentDTO } from 'src/shared/DTO';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';

@Schema({ versionKey: true, timestamps: true })
export class LocationSchemaDTO extends Document implements LocationDocumentDTO {}

export const LocationCollection = 'Location';
export const LocationSchema = SchemaFactory.createForClass(LocationSchemaDTO);
export type LocationModel = Model<LocationDocumentDTO, Document>;

//---------------------------------------------------
