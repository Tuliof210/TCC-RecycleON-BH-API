import { IMetadataRepository } from '..';
import { Metadata } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';

import { MetadataCollection, MetadataModel } from './MetadaMongoDB.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MetadataMongoDBRepository implements IMetadataRepository {
  constructor(@InjectModel(MetadataCollection) private metadataModel: MetadataModel) {}

  async save(metadata: Metadata, fullView = false) {
    try {
      const docMetadata = await this.metadataModel.create(metadata);
      return docMetadata.view(fullView);
    } catch (error) {
      throw new CustomError({ name: 'Error on create metadata', message: error.message });
    }
  }
}
