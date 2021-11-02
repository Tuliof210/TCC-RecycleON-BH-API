import { UpdateLocationsService } from './UpdateLocations.service';
import { UpdateMetadataService } from './UpdateWiki.service';

import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

import { CronJob } from 'cron';

@Injectable()
export class UpdateLocationsCron {
  private cronUpdateLocations: string;

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly updateLocationsService: UpdateLocationsService,
    private readonly updateMetadataService: UpdateMetadataService,
  ) {
    this.cronUpdateLocations = this.config.get<string>('cronUpdateLocations');
    const updateLocationsJob = new CronJob(this.cronUpdateLocations, this.handleUpdateLocations.bind(this));

    this.schedulerRegistry.addCronJob('updateLocations', updateLocationsJob);
    updateLocationsJob.start();
  }

  handleUpdateLocations() {
    const metadata = this.updateLocationsService.start();
    this.updateMetadataService.start(metadata);
  }
}
