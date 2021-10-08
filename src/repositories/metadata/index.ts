import { Metadata } from 'src/shared/entities';
import { MetadataDTO } from 'src/shared/DTO';

export interface IMetadataRepository {
  save(metadata: Metadata, fullView?: boolean): Promise<MetadataDTO>;

  getById(_id: string, fullView?: boolean): Promise<MetadataDTO>;
  retrieveAll(fullView?: boolean): Promise<{ count: number; list: Array<MetadataDTO> }>;
}
export const IMetadataRepositoryToken = 'IMetadataRepositoryToken';
