import { IMetadataService } from '.';

import { IMetadataRepository, IMetadataRepositoryToken } from 'src/repositories/metadata';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MetadataService implements IMetadataService {
  constructor(@Inject(IMetadataRepositoryToken) private readonly metadataRepository: IMetadataRepository) {}

  async getOne(metadataId: string, fullView = false) {
    const foundMetadata = await this.metadataRepository.getById(metadataId);
    return foundMetadata.view(fullView);
  }

  async getMetadata(fullView = false) {
    const foundMetadata = await this.metadataRepository.retrieveAll();

    const metadataList = foundMetadata.list;
    foundMetadata.list = metadataList.map((metadata) => metadata.view(fullView));

    return foundMetadata;
  }
}
