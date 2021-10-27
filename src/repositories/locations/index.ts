import { Location } from 'src/shared/entities';
import { LocationDTO, LocationMapDTO, QueryParamsDTO } from 'src/shared/DTO';

import { Document } from 'mongoose';

export interface ILocationsRepository {
  saveOrUpdate(location: Location, fullView?: boolean): Promise<void | LocationDTO>;

  findOne(locationQuery: Record<string, unknown>): Promise<void | (LocationDTO & Document<any, any, LocationDTO>)>;
  getLocations(locationQuery: QueryParamsDTO, fullView?: boolean): Promise<LocationMapDTO>;
  getById(_id: string, fullView?: boolean): Promise<LocationDTO>;
}
export const ILocationsRepositoryToken = 'ILocationsRepositoryToken';
