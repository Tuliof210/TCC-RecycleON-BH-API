import { QueryParamsDTO } from 'src/shared/DTO';
import { ILocationController, ILocationService, ILocationServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';
import { QueryParamsNormalizationPipe } from 'src/shared/pipes';

import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';

import * as utm from 'utm';

@Controller('locations')
export class LocationController implements ILocationController {
  constructor(@Inject(ILocationServiceToken) private readonly locationService: ILocationService) {}

  @Get()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async retrieve(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {
    return this.locationService.retrieve(locationsQuery);
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
    return this.locationService.getLocationsMap(locationsQuery);
  }

  @Get(':id')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async get(locationId: string) {
    return this.locationService.get(locationId);
  }
}
