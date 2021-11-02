import { IWikiController, IWikiService, IWikiServiceToken } from '.';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/entities';

import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Wiki')
@Controller('wiki')
export class WikiController implements IWikiController {
  constructor(@Inject(IWikiServiceToken) private readonly wikiService: IWikiService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The wiki list has been succesfully returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getWiki() {
    return this.wikiService.getWiki();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The wiki item has been succesfully returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getItem(@Param('id') wikiItemId: string) {
    return this.wikiService.getItem(wikiItemId, true);
  }
}
