import { Wiki } from 'src/shared/entities';
import { WikiDTO } from 'src/shared/DTO';

export interface IWikiRepository {
  saveOrUpdate(wiki: Wiki): Promise<WikiDTO>;
  getById(_id: string): Promise<WikiDTO>;
  retrieveAll(): Promise<{ count: number; list: Array<WikiDTO> }>;
}
export const IWikiRepositoryToken = 'IWikiRepositoryToken';
