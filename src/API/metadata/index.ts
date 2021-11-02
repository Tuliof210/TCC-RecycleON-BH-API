import { MetadataDTO } from 'src/shared/DTO';

export interface IMetadataController {
  getOne(metadataId: string): Promise<MetadataDTO>;
  getMetadata(): Promise<{ count: number; list: Array<MetadataDTO> }>;
}

export interface IMetadataService {
  getOne(metadataId: string, fullView?: boolean): Promise<MetadataDTO>;
  getMetadata(fullView?: boolean): Promise<{ count: number; list: Array<MetadataDTO> }>;
}

export const IMetadataServiceToken = 'IMetadataServiceToken';

export { MetadataModule } from './Wiki.module';
