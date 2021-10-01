import { LocationsMongoDBRepositoryModule } from 'src/repositories/locations/mongoDB';
import { MetadataMongoDBRepositoryModule } from 'src/repositories/metadata/mongoDB';

import { UpdateLocationsCron } from './update/UpdateLocations.cron';
import { UpdateLocationsService } from './update/UpdateLocations.service';
import { UpdateMetadataService } from './update/UpdateMetadata.service';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [LocationsMongoDBRepositoryModule, MetadataMongoDBRepositoryModule, ScheduleModule.forRoot(), HttpModule],
  providers: [UpdateLocationsCron, UpdateLocationsService, UpdateMetadataService],
})
export class CronModule {}
