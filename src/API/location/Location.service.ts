import { ILocationService } from '.';

import { CreateLocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { ILocationsRepository, ILocationsRepositoryToken } from 'src/repositories/locations';
import { Location } from 'src/shared/entities';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocationService implements ILocationService {
  constructor(@Inject(ILocationsRepositoryToken) private readonly locationRepository: ILocationsRepository) {}

  create(locationData: CreateLocationDTO, fullView = false) {
    const location = new Location(locationData);
    return this.locationRepository.save(location, fullView);
  }

  retrieve(locationsQuery: QueryParamsDTO, fullView = false) {
    return this.locationRepository.retrieveAll(locationsQuery, fullView);
  }

  getLocationsMap(locationsQuery: QueryParamsDTO, fullView = false) {
    return this.locationRepository.getLocationsMap(locationsQuery, fullView);
  }

  get(locationId: string, fullView = false) {
    return this.locationRepository.getById(locationId, fullView);
  }
}
