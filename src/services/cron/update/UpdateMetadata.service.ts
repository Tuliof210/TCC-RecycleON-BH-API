import { Metadata, MetadataType } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';
import { IMetadataRepository, IMetadataRepositoryToken } from 'src/repositories/metadata';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UpdateMetadataService {
  metadataSpreadsheetLink: string;

  constructor(
    @Inject(IMetadataRepositoryToken) private readonly metadataRepository: IMetadataRepository,
    private readonly config: ConfigService,
  ) {
    this.metadataSpreadsheetLink = this.config.get<string>('metadataSpreadsheet');
  }

  async start(data: Promise<{ locationTags: Array<string>; materials: Array<string> }>): Promise<void> {
    const { locationTags, materials } = await data;

    try {
      await this.createMetadata(locationTags, MetadataType.location);
      await this.createMetadata(materials, MetadataType.material);
    } catch (error) {
      throw new CustomError({ name: 'Error on create metadata', message: error.message });
    }
  }

  async createMetadata(tags: Array<string>, type: string): Promise<void> {
    tags.forEach((tag) => {
      this.metadataRepository.saveOrUpdate(new Metadata({ type, tag })).then((document) => console.log(document));
    });
  }
}
