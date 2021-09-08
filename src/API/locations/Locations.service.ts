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
    const { query, select, cursor } = locationsQuery;
    delete cursor.limit;

    if (query.idExternal) {
      query['$or'] = this.mountIdExternalQuery(query.idExternal);
      delete query.idExternal;
    }

    if (query.materials) {
      query['properties.materials'] = this.mountMaterialQuery(query.materials);
      delete query.materials;
    }

    return this.locationsRepository.getLocations({ query, select, cursor }, fullView);
  }

  mountIdExternalQuery(query: string) {
    const listOfValues = query.split(',');
    return listOfValues.map((value) => ({
      'properties.idExternal': value,
    }));
  }

  mountMaterialQuery(query: string) {
    const listOfValues = query.split(',');
    return listOfValues.length > 1 ? { $all: listOfValues } : listOfValues[0];
  }
}
