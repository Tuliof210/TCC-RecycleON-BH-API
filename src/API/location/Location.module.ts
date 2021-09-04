import { ILocationServiceToken } from '.';
import { LocationMongoDBRepositoryModule } from 'src/repositories/location/mongoDB';
import { LocationController } from './Location.controller';
import { LocationService } from './Location.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [LocationMongoDBRepositoryModule],
  controllers: [LocationController],
  providers: [{ provide: ILocationServiceToken, useClass: LocationService }],
  exports: [{ provide: ILocationServiceToken, useClass: LocationService }],
})
export class LocationModule {}
