import { WikiItemDTO } from 'src/shared/DTO';

export interface IWikiController {
  getItem(wikiItemId: string): Promise<WikiItemDTO>;
  getWiki(): Promise<{ count: number; list: Array<WikiItemDTO> }>;
}

export interface IWikiService {
  getItem(wikiItemId: string, fullView?: boolean): Promise<WikiItemDTO>;
  getWiki(fullView?: boolean): Promise<{ count: number; list: Array<WikiItemDTO> }>;
}

export const IWikiServiceToken = 'IWikiServiceToken';

export { WikiModule } from './Wiki.module';
