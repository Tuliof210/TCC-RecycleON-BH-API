import { CreateLocationDTO, LocationDTO, QueryParamsDTO } from 'src/shared/DTO';

export interface ILocationController {
  create(locationData: CreateLocationDTO): Promise<LocationDTO>;

  retrieve(locationsQuery: QueryParamsDTO): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(locationsQuery: QueryParamsDTO): Promise<{ type: string; features: Array<LocationDTO> }>;
  get(locationId: string): Promise<LocationDTO>;
}

export interface ILocationService {
  create(locationData: CreateLocationDTO, fullView?: boolean): Promise<LocationDTO>;

  retrieve(locationsQuery: QueryParamsDTO, fullView?: boolean): Promise<{ count: number; list: Array<LocationDTO> }>;
  getLocationsMap(
    locationsQuery: QueryParamsDTO,
    fullView?: boolean,
  ): Promise<{ type: string; features: Array<LocationDTO> }>;
  get(locationId: string, fullView?: boolean): Promise<LocationDTO>;
}

export {} from './Location.module';
