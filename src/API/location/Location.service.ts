import { ILocationService } from '.';

import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDTO, QueryParamsDTO } from 'src/shared/DTO';

@Injectable()
export class LocationService implements ILocationService {
  constructor(@Inject() private readonly locationRepository: ILocationRepository) {}

  create(locationData: CreateLocationDTO, fullView = false) {}

  retrieve(locationsQuery: QueryParamsDTO, fullView = false) {}

  getLocationsMap(locationsQuery: QueryParamsDTO, fullView = false) {}
}
