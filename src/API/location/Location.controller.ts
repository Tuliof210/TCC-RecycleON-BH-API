import { CreateLocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { ILocationController, ILocationService, ILocationServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';
import { QueryParamsNormalizationPipe } from 'src/shared/pipes';

import { Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';

@Controller('locations')
export class LocationController implements ILocationController {
  constructor(@Inject(ILocationServiceToken) private readonly locationService: ILocationService) {}

  @Post()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(locationData: CreateLocationDTO) {
    //TODO add a pipe to create
    return this.locationService.create(locationData);
  }

  @Get()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async retrieve(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {
    return this.locationService.retrieve(locationsQuery);
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
