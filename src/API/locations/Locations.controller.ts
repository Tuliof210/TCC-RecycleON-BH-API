import { ILocationsController, ILocationsService, ILocationsServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { QueryParamsDTO } from 'src/shared/DTO';
import { QueryParamsNormalizationPipe } from 'src/shared/pipes';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';

import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';

import * as utm from 'utm';

@Controller('locations')
export class LocationsController implements ILocationsController {
  constructor(@Inject(ILocationsServiceToken) private readonly locationsService: ILocationsService) {}

  @Get()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async retrieve(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {
    return this.locationsService.retrieve(locationsQuery);
  }

  @Get('test')
  test() {
    const cityZone = {
      number: 23,
      letter: 'K',
    };

    return {
      latLong: utm.toLatLon(613555.0473, 7804298.2887, cityZone.number, cityZone.letter),
      message: 'Hello i am yout free test',
    };
  }

  @Get('map')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getLocationsMap(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {
    return this.locationsService.getLocationsMap(locationsQuery);
  }

  @Get(':id')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async get(@Param('id') locationId: string) {
    return this.locationsService.get(locationId);
  }
}
