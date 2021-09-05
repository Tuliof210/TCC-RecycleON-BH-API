import { LocationsMongoDBRepositoryModule } from 'src/repositories/locations/mongoDB';
import { UpdateLocationsCron } from './update/UpdateLocations.cron';
import { UpdateLocationsService } from './update/UpdateLocations.service';
import { UpdateMaterialsService } from './update/UpdateMaterials.service';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [LocationsMongoDBRepositoryModule, ScheduleModule.forRoot(), HttpModule],
  providers: [UpdateLocationsCron, UpdateLocationsService, UpdateMaterialsService],
})
export class CronModule {}
