import { Metadata, MetadataType } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';
import { IMetadataRepository, IMetadataRepositoryToken } from 'src/repositories/metadata';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMetadataService {
  constructor(@Inject(IMetadataRepositoryToken) private readonly metadataRepository: IMetadataRepository) {}

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
      console.log(new Metadata({ type, tag }));
      this.metadataRepository.save(new Metadata({ type, tag }));
    });
  }
}
