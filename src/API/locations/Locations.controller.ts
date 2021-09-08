import { ILocationsController, ILocationsService, ILocationsServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { QueryParamsDTO } from 'src/shared/DTO';
import { QueryParamsNormalizationPipe } from 'src/shared/pipes';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';

import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';

@Controller('locations')
export class LocationsController implements ILocationsController {
  constructor(@Inject(ILocationsServiceToken) private readonly locationsService: ILocationsService) {}

  @Get()
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getLocations(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {
    return this.locationsService.getLocations(locationsQuery);
  }

  @Get(':id')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getOne(@Param('id') locationId: string) {
    return this.locationsService.getOne(locationId);
  }
}
