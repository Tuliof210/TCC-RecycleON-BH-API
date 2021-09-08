import { UpdateLocationsService } from './UpdateLocations.service';
import { UpdateMaterialsService } from './UpdateMaterials.service';

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
    private readonly updateMaterialsService: UpdateMaterialsService,
  ) {
    this.cronUpdateLocations = this.config.get<string>('cronUpdateLocations');
    const updateLocationsJob = new CronJob(this.cronUpdateLocations, this.handleUpdateLocations.bind(this));

    this.schedulerRegistry.addCronJob('updateLocations', updateLocationsJob);
    updateLocationsJob.start();
  }

  handleUpdateLocations() {
    const materials = this.updateLocationsService.start();
    this.updateMaterialsService.start(materials);
  }
}
