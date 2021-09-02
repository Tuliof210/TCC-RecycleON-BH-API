import { Location } from 'src/shared/entities';

export type CreateLocationDTO = Pick<Location, 'properties'> & { coordinates: [number, number] };

export interface LocationDocumentDTO extends Partial<Location> {
  _id?: any;
  disable?: () => Promise<LocationDocumentDTO>;
  view?: (fullView?: boolean) => LocationDocumentDTO;
}
