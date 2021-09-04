import { CronJob } from 'cron';

import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UpdateLocationsCron {
  private cronUpdateLocations: string;

  constructor(private schedulerRegistry: SchedulerRegistry, private readonly config: ConfigService) {
    this.cronUpdateLocations = this.config.get<string>('cronUpdateLocations');

    const updateLocationJob = new CronJob(this.cronUpdateLocations, this.handleUpdateLocation.bind(this));
    this.schedulerRegistry.addCronJob('updateLocations', updateLocationJob);
    updateLocationJob.start();
  }

  handleUpdateLocation() {
    console.log(`this function is called every ${this.cronUpdateLocations}`);
  }
}
