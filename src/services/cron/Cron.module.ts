import { UpdateLocationsCron } from './update-locations/UpdateLocations.cron';
import { UpdateLocationsService } from './update-locations/UpdateLocations.service';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [UpdateLocationsCron, UpdateLocationsService],
})
export class CronModule {}
