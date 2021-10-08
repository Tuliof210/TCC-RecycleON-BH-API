import { IMetadataService } from '.';

import { IMetadataRepository, IMetadataRepositoryToken } from 'src/repositories/metadata';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MetadataService implements IMetadataService {
  constructor(@Inject(IMetadataRepositoryToken) private readonly metadataRepository: IMetadataRepository) {}

  getOne(metadataId: string, fullView = false) {
    return this.metadataRepository.getById(metadataId, fullView);
  }

  getMetadata(fullView = false) {
    return this.metadataRepository.retrieveAll(fullView);
  }
}
