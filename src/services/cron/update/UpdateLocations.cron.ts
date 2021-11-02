import { UpdateLocationsService } from './UpdateLocations.service';
import { UpdateWikiService } from './UpdateWiki.service';

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
    private readonly updateWikiService: UpdateWikiService,
  ) {
    this.cronUpdateLocations = this.config.get<string>('cronUpdateLocations');
    const updateLocationsJob = new CronJob(this.cronUpdateLocations, this.handleUpdateLocations.bind(this));

    this.schedulerRegistry.addCronJob('updateLocations', updateLocationsJob);
    updateLocationsJob.start();
  }

  handleUpdateLocations() {
    const wiki = this.updateLocationsService.start();
    this.updateWikiService.start(wiki);
  }
}
