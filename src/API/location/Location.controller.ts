import { CreateLocationDTO, QueryParamsDTO } from 'src/shared/DTO';
import { ILocationController } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';
import { QueryParamsNormalizationPipe } from 'src/shared/pipes';

import { Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';

@Controller('locations')
export class LocationController implements ILocationController {
  constructor(@Inject() private readonly locationService: LocationService) {}

  @Post()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(locationData: CreateLocationDTO) {}

  @Get()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async retrieve(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {}

  @Get('map')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getLocationsMap(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {}
}
