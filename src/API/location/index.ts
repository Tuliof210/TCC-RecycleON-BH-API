import { CreateLocationDTO, LocationDocumentDTO, QueryParamsDTO } from 'src/shared/DTO';

export interface ILocationController {
  create(locationData: CreateLocationDTO): Promise<LocationDocumentDTO>;

  retrieve(locationsQuery: QueryParamsDTO): Promise<{ count: number; list: Array<LocationDocumentDTO> }>;
  getLocationsMap(locationsQuery: QueryParamsDTO): Promise<{ type: string; features: Array<LocationDocumentDTO> }>;
  get(locationId: string): Promise<LocationDocumentDTO>;
}

export interface ILocationService {
  create(locationData: CreateLocationDTO, fullView?: boolean): Promise<LocationDocumentDTO>;

  retrieve(
    locationsQuery: QueryParamsDTO,
    fullView?: boolean,
  ): Promise<{ count: number; list: Array<LocationDocumentDTO> }>;
  getLocationsMap(
    locationsQuery: QueryParamsDTO,
    fullView?: boolean,
  ): Promise<{ type: string; features: Array<LocationDocumentDTO> }>;
  get(locationId: string, fullView?: boolean): Promise<LocationDocumentDTO>;
}

export {} from './Location.module';
