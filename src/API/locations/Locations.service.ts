import { ILocationsService } from '.';

import { QueryParamsDTO } from 'src/shared/DTO';
import { ILocationsRepository, ILocationsRepositoryToken } from 'src/repositories/locations';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService implements ILocationsService {
  constructor(@Inject(ILocationsRepositoryToken) private readonly locationsRepository: ILocationsRepository) {}

  retrieve(locationsQuery: QueryParamsDTO, fullView = false) {
    return this.locationsRepository.retrieveAll(locationsQuery, fullView);
  }

  getLocationsMap(locationsQuery: QueryParamsDTO, fullView = false) {
    return this.locationsRepository.getLocationsMap(locationsQuery, fullView);
  }

  get(locationId: string, fullView = false) {
    return this.locationsRepository.getById(locationId, fullView);
  }
}
