import { ILocationsController, ILocationsService, ILocationsServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { QueryParamsDTO } from 'src/shared/DTO';
import { QueryParamsNormalizationPipe } from 'src/shared/pipes';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';

import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController implements ILocationsController {
  constructor(@Inject(ILocationsServiceToken) private readonly locationsService: ILocationsService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The map has been succesfully returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getLocations(@Query(new QueryParamsNormalizationPipe()) locationsQuery: QueryParamsDTO) {
    return this.locationsService.getLocations(locationsQuery);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The location has been succesfully returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getOne(@Param('id') locationId: string) {
    return this.locationsService.getOne(locationId);
  }
}
