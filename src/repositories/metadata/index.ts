import { Metadata } from 'src/shared/entities';
import { MetadataDTO } from 'src/shared/DTO';

export interface IMetadataRepository {
  saveOrUpdate(metadata: Metadata): Promise<MetadataDTO>;
  getById(_id: string): Promise<MetadataDTO>;
  retrieveAll(): Promise<{ count: number; list: Array<MetadataDTO> }>;
}
export const IMetadataRepositoryToken = 'IMetadataRepositoryToken';
