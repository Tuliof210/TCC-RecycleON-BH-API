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

  async saveOrUpdate(location: Location) {
    return this.locationModel
      .findOneAndUpdate({ 'properties.idExternal': location.properties.idExternal }, location, {
        new: true,
        upsert: true,
      })
      .exec()
      .catch((error: Error) => {
        if (error.message === "Performing an update on the path '_id' would modify the immutable field '_id'") {
          const newLocation = { ...location };
          delete newLocation._id;
          return this.saveOrUpdate(newLocation);
        }
        throw error;
      });
  }

  //======================================================================================

  findOne(locationQuery: Record<string, unknown>): Promise<void | LocationDocumentDTO> {
    return this.locationModel.findOne(locationQuery).exec();
  }

  async getLocations({ query, select, cursor }: QueryParamsDTO, fullView = false) {
    console.log(query, select, cursor);

    const countLocations = await this.locationModel.countDocuments(query).exec();
    const retrievedLocations = await this.locationModel.find(query, select, cursor).exec();
    return {
      type: 'FeatureCollection',
      count: countLocations,
      features: retrievedLocations.map((location) => ({
        type: 'Feature',
        ...location.view(fullView),
      })),
    };
  }

  async getById(_id: string, fullView = false) {
    const foundLocation = await this.findOne({ _id });
    if (foundLocation) return foundLocation.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `Location ${_id} not found` });
  }
}
