import { Metadata } from 'src/shared/entities';
import { MetadataDTO } from 'src/shared/DTO';

export interface IMetadataRepository {
  save(metadata: Metadata, fullView?: boolean): Promise<MetadataDTO>;
}
export const IMetadataRepositoryToken = 'IMetadataRepositoryToken';
