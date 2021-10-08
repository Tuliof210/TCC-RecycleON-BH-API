import { IMetadataController, IMetadataService, IMetadataServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';

import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Metadata')
@Controller('Metadata')
export class MetadataController implements IMetadataController {
  constructor(@Inject(IMetadataServiceToken) private readonly metadataService: IMetadataService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The metadata list has been succesfully returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getMetadata() {
    return this.metadataService.getMetadata();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The metadata has been succesfully returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getOne(@Param('id') metadataId: string) {
    return this.metadataService.getOne(metadataId);
  }
}
