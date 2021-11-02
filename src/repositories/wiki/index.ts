import { WikiItem } from 'src/shared/entities';
import { WikiItemDTO } from 'src/shared/DTO';

export interface IWikiRepository {
  saveOrUpdate(wikiItem: WikiItem): Promise<WikiItemDTO>;
  getById(_id: string): Promise<WikiItemDTO>;
  retrieveAll(): Promise<{ count: number; list: Array<WikiItemDTO> }>;
}
export const IWikiRepositoryToken = 'IWikiRepositoryToken';
