import { ILocationServiceToken } from '.';
import { LocationsMongoDBRepositoryModule } from 'src/repositories/locations/mongoDB';
import { LocationController } from './Location.controller';
import { LocationService } from './Location.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [LocationsMongoDBRepositoryModule],
  controllers: [LocationController],
  providers: [{ provide: ILocationServiceToken, useClass: LocationService }],
  exports: [{ provide: ILocationServiceToken, useClass: LocationService }],
})
export class LocationModule {}
