import { IMetadataRepository } from '..';
import { MetadataDTO } from 'src/shared/DTO';
import { CustomError } from 'src/shared/classes';

import { MetadataCollection, MetadataModel } from './MetadaMongoDB.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MetadataMongoDBRepository implements IMetadataRepository {
  constructor(@InjectModel(MetadataCollection) private metadataModel: MetadataModel) {}

  async saveOrUpdate(metadata: MetadataDTO): Promise<MetadataDTO> {
    return this.metadataModel
      .findOneAndUpdate({ tag: metadata.tag, type: metadata.type }, metadata, { new: true, upsert: true })
      .exec()
      .catch((error: Error) => {
        if (error.message === "Performing an update on the path '_id' would modify the immutable field '_id'") {
          const newMetadata = { ...metadata };
          delete newMetadata._id;
          return this.saveOrUpdate(newMetadata);
        }
        throw error;
      });
  }

  async getById(_id: string) {
    const foundMetadata = await this.metadataModel.findById(_id).exec();
    if (foundMetadata) return foundMetadata;

    throw new CustomError({ name: 'Not Found', message: `Metadata ${_id} not found` });
  }

  async retrieveAll() {
    const countMetadata = await this.metadataModel.countDocuments({}).exec();
    const retrievedMetadata = await this.metadataModel.find({}).exec();
    return {
      count: countMetadata,
      list: retrievedMetadata,
    };
  }
}
