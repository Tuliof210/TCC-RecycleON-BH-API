import { ILocationsService } from '.';

import { CreateLocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { ILocationsRepository, ILocationsRepositoryToken } from 'src/repositories/locations';
import { Location } from 'src/shared/entities';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService implements ILocationsService {
  constructor(@Inject(ILocationsRepositoryToken) private readonly locationsRepository: ILocationsRepository) {}

  create(locationData: CreateLocationDTO, fullView = false) {
    const location = new Location(locationData);
    return this.locationsRepository.save(location, fullView);
  }

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
