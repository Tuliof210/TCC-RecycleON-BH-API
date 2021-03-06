import { Location } from 'src/shared/entities';
import { Document } from 'mongoose';

export type CreateLocationDTO = Pick<Location, 'locationTag' | 'properties'> & { coordinates: [number, number] };

export interface LocationDTO extends Partial<Location> {
  _id?: any;
  view?: (fullView?: boolean) => LocationDTO;
}
export type LocationDocumentDTO = LocationDTO & Document<any, any, LocationDTO>;

export type LocationMapDTO = { type: string; count: number; features: Array<LocationDTO> };
