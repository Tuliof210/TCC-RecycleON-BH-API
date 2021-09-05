import { ILocationsServiceToken } from '.';
import { LocationsMongoDBRepositoryModule } from 'src/repositories/locations/mongoDB';
import { LocationsController } from './Locations.controller';
import { LocationsService } from './Locations.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [LocationsMongoDBRepositoryModule],
  controllers: [LocationsController],
  providers: [{ provide: ILocationsServiceToken, useClass: LocationsService }],
  exports: [{ provide: ILocationsServiceToken, useClass: LocationsService }],
})
export class LocationsModule {}
