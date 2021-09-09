import { LocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { LocationMapDTO } from 'src/shared/DTO/Location.dto';

export interface ILocationsController {
  getOne(locationId: string): Promise<LocationDTO>;
  getLocations(locationsQuery: QueryParamsDTO): Promise<LocationMapDTO>;
}

export interface ILocationsService {
  getOne(locationId: string, fullView?: boolean): Promise<LocationDTO>;
  getLocations(locationsQuery: QueryParamsDTO, fullView?: boolean): Promise<LocationMapDTO>;
}
export const ILocationsServiceToken = 'ILocationsServiceToken';

export { LocationsModule } from './Locations.module';
