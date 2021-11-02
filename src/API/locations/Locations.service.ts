import { ILocationsService } from '.';

import { QueryParamsDTO } from 'src/shared/DTO';
import { ILocationsRepository, ILocationsRepositoryToken } from 'src/repositories/locations';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService implements ILocationsService {
  constructor(@Inject(ILocationsRepositoryToken) private readonly locationsRepository: ILocationsRepository) {}

  async getOne(locationId: string, fullView = false) {
    const foundLocation = await this.locationsRepository.getById(locationId);
    return foundLocation.view(fullView);
  }

  async getLocations(locationsQuery: QueryParamsDTO, fullView = false) {
    const { query, select, cursor } = locationsQuery;
    delete cursor.limit;

    if (query.locationTag) {
      query['$or'] = this.mountLocationQuery(query.locationTag);
      delete query.locationTag;
    }

    if (query.materials) {
      query['properties.materials'] = this.mountMaterialQuery(query.materials);
      delete query.materials;
    }

    const foundLocatins = await this.locationsRepository.getLocations({ query, select, cursor });
    foundLocatins.features.map((feature) => feature.view(fullView));

    return foundLocatins;
  }

  mountLocationQuery(query: string) {
    const listOfValues = query.split(',');
    return listOfValues.map((value) => ({ locationTag: value }));
  }

  mountMaterialQuery(query: string) {
    const listOfValues = query.split(',');
    return listOfValues.length > 1 ? { $all: listOfValues } : listOfValues[0];
  }
}
