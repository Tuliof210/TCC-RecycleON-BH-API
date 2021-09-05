import { CreateLocationDTO, LocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { LocationMapDTO } from 'src/shared/DTO/Location.dto';

export interface ILocationsController {
  retrieve(locationsQuery: QueryParamsDTO): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(locationsQuery: QueryParamsDTO): Promise<LocationMapDTO>;
  get(locationId: string): Promise<LocationDTO>;
}

export interface ILocationsService {
  create(locationData: CreateLocationDTO, fullView?: boolean): Promise<LocationDTO>;

  retrieve(locationsQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(locationsQuery: QueryParamsDTO, fullView?: boolean): Promise<LocationMapDTO>;
  get(locationId: string, fullView?: boolean): Promise<LocationDTO>;
}
export const ILocationsServiceToken = 'ILocationsServiceToken';

export { LocationsModule } from './Locations.module';
