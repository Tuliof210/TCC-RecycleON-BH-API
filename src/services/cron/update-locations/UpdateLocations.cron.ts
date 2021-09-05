import { CustomError } from 'src/shared/classes';
import { UpdateLocationsService } from './UpdateLocations.service';

import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

import { CronJob } from 'cron';

@Injectable()
export class UpdateLocationsCron {
  private cronUpdateLocations: string;

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly updateLocationsService: UpdateLocationsService,
    private readonly config: ConfigService,
  ) {
    this.cronUpdateLocations = this.config.get<string>('cronUpdateLocations');
    const updateLocationsJob = new CronJob(this.cronUpdateLocations, this.handleUpdateLocations.bind(this));

    this.schedulerRegistry.addCronJob('updateLocations', updateLocationsJob);
    updateLocationsJob.start();
  }

  handleUpdateLocations() {
    console.log(`this function is called every ${this.cronUpdateLocations}`);
    this.updateLocationsService.findAll().subscribe({
      next: (features) => {
        console.log(features);
      },
      error: (error: Error) => {
        throw new CustomError({ name: 'API Error', message: error.message });
      },
      complete: () => console.info('request done'),
    });
  }
}
