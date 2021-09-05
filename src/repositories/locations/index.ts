import { Location } from 'src/shared/entities';
import { LocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { LocationMapDTO } from 'src/shared/DTO/Location.dto';

import { Document } from 'mongoose';

export interface ILocationsRepository {
  saveOrUpdate(location: Location, fullView?: boolean): Promise<LocationDTO>;

  findOne(locationQuery: Record<string, unknown>): Promise<void | (LocationDTO & Document<any, any, LocationDTO>)>;
  retrieveAll(locationQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(locationQuery: QueryParamsDTO, fullView?: boolean): Promise<LocationMapDTO>;
  getById(_id: string, fullView?: boolean): Promise<LocationDTO>;
}
export const ILocationsRepositoryToken = 'ILocationsRepositoryToken';
