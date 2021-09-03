import { Location } from 'src/shared/entities';
import { LocationDocumentDTO, QueryParamsDTO } from 'src/shared/DTO';

import { Document } from 'mongoose';

export interface ILocationRepository {
  save(location: Location, fullView?: boolean): Promise<LocationDocumentDTO>;

  findOne(
    locationQuery: Record<string, unknown>,
  ): Promise<void | (LocationDocumentDTO & Document<any, any, LocationDocumentDTO>)>;
  getById(_id: string, fullView?: boolean): Promise<LocationDocumentDTO>;
  retrieveAll(
    locationQuery: QueryParamsDTO,
    fullView?: boolean,
  ): Promise<{ count: number; list: Array<LocationDocumentDTO> }>;
}
export const ILocationRepositoryToken = 'ILocationRepositoryToken';
