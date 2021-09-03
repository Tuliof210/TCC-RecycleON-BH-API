import { ILocationRepositoryToken } from '..';
import { LocationMongoDBRepository } from './LocationMongoDB.repository';
import { LocationCollection, LocationSchema } from './LocationMongoDB.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: LocationCollection, schema: LocationSchema }])],
  providers: [{ provide: ILocationRepositoryToken, useClass: LocationMongoDBRepository }],
  exports: [{ provide: ILocationRepositoryToken, useClass: LocationMongoDBRepository }],
})
export class LocationMongoDBRepositoryModule {}
