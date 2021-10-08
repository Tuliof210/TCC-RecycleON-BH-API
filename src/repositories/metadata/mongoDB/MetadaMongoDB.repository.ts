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

  async getById(_id: string, fullView = false) {
    const foundMetadata = await this.metadataModel.findById(_id).exec();
    if (foundMetadata) return foundMetadata.view(fullView);

    throw new CustomError({ name: 'Not Found', message: `Metadata ${_id} not found` });
  }

  async retrieveAll(fullView = false) {
    const countMetadata = await this.metadataModel.countDocuments({}).exec();
    const retrievedMetadata = await this.metadataModel.find({}).exec();

    return {
      count: countMetadata,
      list: retrievedMetadata.map((metadata) => metadata.view(fullView)),
    };
  }
}
