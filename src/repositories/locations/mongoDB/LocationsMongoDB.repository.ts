import { LocationDocumentDTO, QueryParamsDTO } from 'src/shared/DTO';
import { ILocationsRepository } from '..';
import { Location } from 'src/shared/entities';
import { LocationCollection, LocationModel } from './LocationMongoDB.schema';
import { CustomError } from 'src/shared/classes';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationsMongoDBRepository implements ILocationsRepository {
  constructor(@InjectModel(LocationCollection) private readonly locationModel: LocationModel) {}

  async saveOrUpdate(location: Location, fullView = false) {
    const docLocation = await this.locationModel.create(location).catch(() => {
      return this.locationModel
        .findOneAndUpdate(
          { 'properties.idExternal': location.properties.idExternal },
          { geometry: location.geometry, properties: location.properties },
          {
            new: true,
            upsert: true,
          },
        )
        .exec();
    });
    return docLocation.view(fullView);
  }

  //======================================================================================

  findOne(locationQuery: Record<string, unknown>): Promise<void | LocationDocumentDTO> {
    return this.locationModel.findOne(locationQuery).exec();
  }

  async retrieveAll({ query, select, cursor }: QueryParamsDTO, fullView = false) {
    const countLocations = await this.locationModel.countDocuments(query).exec();
    const retrievedLocations = await this.locationModel.find(query, select, cursor).exec();

    return {
      count: countLocations,
      list: retrievedLocations.map((location) => location.view(fullView)),
    };
  }

  async getLocationsMap({ query, select, cursor }: QueryParamsDTO, fullView = false) {
    const retrievedLocations = await this.locationModel.find(query, select, cursor).exec();
    return {
      type: 'FeatureCollection',
      features: retrievedLocations.map((location) => location.view(fullView)),
    };
  }

  async getById(_id: string, fullView = false) {
    const foundLocation = await this.findOne({ _id });
    if (foundLocation) return foundLocation.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `Location ${_id} not found` });
  }
}
