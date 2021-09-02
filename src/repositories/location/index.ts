import { Location } from 'src/shared/entities';
import { LocationDocumentDTO, QueryParamsDTO } from 'src/shared/DTO';

export interface ILocationRepository {
  save(location: Location, fullView?: boolean): Promise<LocationDocumentDTO>;
  retrieveAll(
    locationQuery: QueryParamsDTO,
    fullView?: boolean,
  ): Promise<{ count: number; list: Array<LocationDocumentDTO> }>;
}
export const ILocationRepositoryToken = 'ILocationRepositoryToken';
