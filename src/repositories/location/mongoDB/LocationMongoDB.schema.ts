import { LocationDTO } from 'src/shared/DTO';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document, Model } from 'mongoose';

@Schema({ _id: false, versionKey: false, timestamps: false }) // sub subdocument
class AddressProps extends Document {
  @Prop({ default: null }) street: string;
  @Prop({ default: null }) number: string;
  @Prop({ default: null }) neighborhood: string;
  @Prop({ default: null }) region: string;
  @Prop({ default: null }) reference: string;
}
const AddressSchema = SchemaFactory.createForClass(AddressProps);

//=================================================================================

@Schema({ _id: false, versionKey: false, timestamps: false }) // subdocument
class GeometryProps extends Document {
  @Prop({ required: true }) type: string;
  @Prop({ required: true, type: [Number] }) coordinates: [number, number];
}
const GeometrySchema = SchemaFactory.createForClass(GeometryProps);

@Schema({ _id: false, versionKey: false, timestamps: false }) // subdocument
class PropertiesProps extends Document {
  @Prop({ required: true }) idExternal: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true, type: [String] }) typeOfMaterial: Array<string>; //TODO update this when create 'material' collection
  @Prop({ required: true }) businessHours: string; //TODO convert the string into a object with date
  @Prop({ required: true, type: AddressSchema }) address: AddressProps;
  @Prop({ required: true }) info: string;
}
const PropertiesSchema = SchemaFactory.createForClass(PropertiesProps);

//=================================================================================
//=================================================================================

@Schema({ versionKey: true, timestamps: true })
class LocationProps extends Document implements LocationDTO {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, type: GeometrySchema })
  geometry: GeometryProps;

  @Prop({ required: true, type: PropertiesSchema })
  properties: PropertiesProps;
}

export const LocationSchema = SchemaFactory.createForClass(LocationProps);
export const LocationCollection = 'Location';
export type LocationModel = Model<LocationDTO, Document>;

//=================================================================================

LocationSchema.methods.view = function (): LocationDTO {
  return this;
};
