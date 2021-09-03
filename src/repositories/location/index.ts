import { Location } from 'src/shared/entities';
import { LocationDTO, QueryParamsDTO } from 'src/shared/DTO';

import { Document } from 'mongoose';

export interface ILocationRepository {
  save(location: Location, fullView?: boolean): Promise<LocationDTO>;

  findOne(locationQuery: Record<string, unknown>): Promise<void | (LocationDTO & Document<any, any, LocationDTO>)>;
  getById(_id: string, fullView?: boolean): Promise<LocationDTO>;
  retrieveAll(locationQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<LocationDTO> }>;
}
export const ILocationRepositoryToken = 'ILocationRepositoryToken';
