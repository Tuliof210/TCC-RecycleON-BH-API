import { ILocationsRepositoryToken } from '..';
import { LocationsMongoDBRepository } from './LocationsMongoDB.repository';
import { LocationCollection, LocationSchema } from './LocationMongoDB.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: LocationCollection, schema: LocationSchema }])],
  providers: [{ provide: ILocationsRepositoryToken, useClass: LocationsMongoDBRepository }],
  exports: [{ provide: ILocationsRepositoryToken, useClass: LocationsMongoDBRepository }],
})
export class LocationsMongoDBRepositoryModule {}
