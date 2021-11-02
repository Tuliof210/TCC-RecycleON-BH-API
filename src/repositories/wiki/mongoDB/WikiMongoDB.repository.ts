import { IWikiRepository } from '..';
import { WikiDTO } from 'src/shared/DTO';
import { CustomError } from 'src/shared/classes';

import { WikiCollection, WikiModel } from './WikiMongoDB.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WikiMongoDBRepository implements IWikiRepository {
  constructor(@InjectModel(WikiCollection) private wikiModel: WikiModel) {}

  async saveOrUpdate(wiki: WikiDTO): Promise<WikiDTO> {
    return this.wikiModel
      .findOneAndUpdate({ tag: wiki.tag, type: wiki.type }, wiki, { new: true, upsert: true })
      .exec()
      .catch((error: Error) => {
        if (error.message === "Performing an update on the path '_id' would modify the immutable field '_id'") {
          const newWiki = { ...wiki };
          delete newWiki._id;
          return this.saveOrUpdate(newWiki);
        }
        throw error;
      });
  }

  async getById(_id: string) {
    const foundWiki = await this.wikiModel.findById(_id).exec();
    if (foundWiki) return foundWiki;

    throw new CustomError({ name: 'Not Found', message: `Wiki item ${_id} not found` });
  }

  async retrieveAll() {
    const countWiki = await this.wikiModel.countDocuments({}).exec();
    const retrievedWiki = await this.wikiModel.find({}).exec();
    return {
      count: countWiki,
      list: retrievedWiki,
    };
  }
}
