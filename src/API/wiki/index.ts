import { WikiDTO } from 'src/shared/DTO';

export interface IWikiController {
  getOne(wikiId: string): Promise<WikiDTO>;
  getWiki(): Promise<{ count: number; list: Array<WikiDTO> }>;
}

export interface IWikiService {
  getOne(wikiId: string, fullView?: boolean): Promise<WikiDTO>;
  getWiki(fullView?: boolean): Promise<{ count: number; list: Array<WikiDTO> }>;
}

export const IWikiServiceToken = 'IWikiServiceToken';

export { WikiModule } from './Wiki.module';
