import { IWikiService } from '.';

import { IWikiRepository, IWikiRepositoryToken } from 'src/repositories/wiki';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WikiService implements IWikiService {
  constructor(@Inject(IWikiRepositoryToken) private readonly wikiRepository: IWikiRepository) {}

  async getItem(wikiItemId: string, fullView = false) {
    const foundWikiItem = await this.wikiRepository.getById(wikiItemId);
    return foundWikiItem.view(fullView);
  }

  async getWiki(fullView = false) {
    const foundWiki = await this.wikiRepository.retrieveAll();

    const wikiList = foundWiki.list;
    foundWiki.list = wikiList.map((wikiItem) => wikiItem.view(fullView));

    return foundWiki;
  }
}
