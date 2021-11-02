import { IWikiService } from '.';

import { IWikiRepository, IWikiRepositoryToken } from 'src/repositories/wiki';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WikiService implements IWikiService {
  constructor(@Inject(IWikiRepositoryToken) private readonly wikiRepository: IWikiRepository) {}

  async getOne(wikiId: string, fullView = false) {
    const foundWiki = await this.wikiRepository.getById(wikiId);
    return foundWiki.view(fullView);
  }

  async getWiki(fullView = false) {
    const foundWiki = await this.wikiRepository.retrieveAll();

    const wikiList = foundWiki.list;
    foundWiki.list = wikiList.map((wiki) => wiki.view(fullView));

    return foundWiki;
  }
}
