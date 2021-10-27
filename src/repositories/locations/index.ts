import { Location } from 'src/shared/entities';
import { LocationDTO, LocationMapDTO, QueryParamsDTO } from 'src/shared/DTO';

export interface ILocationsRepository {
  saveOrUpdate(location: Location): Promise<void | LocationDTO>;
  getLocations(locationQuery: QueryParamsDTO): Promise<LocationMapDTO>;
  getById(_id: string): Promise<LocationDTO>;
}
export const ILocationsRepositoryToken = 'ILocationsRepositoryToken';
