import { ILocationsService } from '.';

import { QueryParamsDTO } from 'src/shared/DTO';
import { ILocationsRepository, ILocationsRepositoryToken } from 'src/repositories/locations';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService implements ILocationsService {
  constructor(@Inject(ILocationsRepositoryToken) private readonly locationsRepository: ILocationsRepository) {}

  getOne(locationId: string, fullView = false) {
    return this.locationsRepository.getById(locationId, fullView);
  }

  getLocations(locationsQuery: QueryParamsDTO, fullView = false) {
    console.log(locationsQuery);
    return this.locationsRepository.getLocations(locationsQuery, fullView);
  }
}
