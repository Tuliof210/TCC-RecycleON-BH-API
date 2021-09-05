import { UpdateLocationsCron } from './update-locations/UpdateLocations.cron';
import { UpdateLocationsService } from './update-locations/UpdateLocations.service';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { LocationsMongoDBRepositoryModule } from 'src/repositories/locations/mongoDB';

@Module({
  imports: [LocationsMongoDBRepositoryModule, ScheduleModule.forRoot(), HttpModule],
  providers: [UpdateLocationsCron, UpdateLocationsService],
})
export class CronModule {}
