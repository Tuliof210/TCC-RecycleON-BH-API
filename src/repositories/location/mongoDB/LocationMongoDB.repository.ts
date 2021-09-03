import { QueryParamsDTO } from 'src/shared/DTO';
import { ILocationRepository } from '..';
import { Location } from 'src/shared/entities';
import { LocationCollection, LocationModel } from './LocationMongoDB.schema';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocationMongoDBRepository implements ILocationRepository {
  constructor(@Inject(LocationCollection) private readonly locationModel: LocationModel) {}

  async save(location: Location, fullView = false) {
    const createdLocation = await this.locationModel.create(location);
    return createdLocation.view(fullView);
  }

  async retrieveAll({ query, select, cursor }: QueryParamsDTO, fullView = false) {
    const countLocations = await this.locationModel.countDocuments(query).exec();
    const retrievedLocations = await this.locationModel.find(query, select, cursor).exec();

    return {
      count: countLocations,
      list: retrievedLocations.map((location) => location.view(fullView)),
    };
  }
}
