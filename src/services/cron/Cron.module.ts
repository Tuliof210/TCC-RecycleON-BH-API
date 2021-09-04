import { UpdateLocationsCron } from './update-locations/UpdateLocations.cron';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [UpdateLocationsCron],
})
export class CronModule {}
