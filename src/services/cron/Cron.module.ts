import { UpdateLocationsCron } from './update-locations/UpdateLocations.cron';

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [UpdateLocationsCron],
})
export class CronModule {}
