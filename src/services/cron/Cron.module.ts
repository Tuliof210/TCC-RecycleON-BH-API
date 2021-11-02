import { LocationsMongoDBRepositoryModule } from 'src/repositories/locations/mongoDB';
import { WikiMongoDBRepositoryModule } from 'src/repositories/wiki/mongoDB';

import { UpdateLocationsCron } from './update/UpdateLocations.cron';
import { UpdateLocationsService } from './update/UpdateLocations.service';
import { UpdateWikiService } from './update/UpdateWiki.service';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [LocationsMongoDBRepositoryModule, WikiMongoDBRepositoryModule, ScheduleModule.forRoot(), HttpModule],
  providers: [UpdateLocationsCron, UpdateLocationsService, UpdateWikiService],
})
export class CronModule {}
