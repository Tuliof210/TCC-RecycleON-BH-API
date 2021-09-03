import { CreateLocationDTO, LocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { LocationMapDTO } from 'src/shared/DTO/Location.dto';

export interface ILocationController {
  create(locationData: CreateLocationDTO): Promise<LocationDTO>;

  retrieve(locationsQuery: QueryParamsDTO): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(locationsQuery: QueryParamsDTO): Promise<LocationMapDTO>;
  get(locationId: string): Promise<LocationDTO>;
}

export interface ILocationService {
  create(locationData: CreateLocationDTO, fullView?: boolean): Promise<LocationDTO>;

  retrieve(locationsQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(locationsQuery: QueryParamsDTO, fullView?: boolean): Promise<LocationMapDTO>;
  get(locationId: string, fullView?: boolean): Promise<LocationDTO>;
}
export const ILocationServiceToken = 'ILocationServiceToken';

export {} from './Location.module';
