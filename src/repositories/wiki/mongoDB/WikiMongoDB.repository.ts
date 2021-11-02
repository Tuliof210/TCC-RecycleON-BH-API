import { IWikiRepository } from '..';
import { WikiItemDTO } from 'src/shared/DTO';
import { CustomError } from 'src/shared/classes';

import { WikiCollection, WikiItemModel } from './WikiItemMongoDB.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WikiMongoDBRepository implements IWikiRepository {
  constructor(@InjectModel(WikiCollection) private wikiItemModel: WikiItemModel) {}

  async saveOrUpdate(wikiItem: WikiItemDTO): Promise<WikiItemDTO> {
    return this.wikiItemModel
      .findOneAndUpdate({ tag: wikiItem.tag, type: wikiItem.type }, wikiItem, { new: true, upsert: true })
      .exec()
      .catch((error: Error) => {
        if (error.message === "Performing an update on the path '_id' would modify the immutable field '_id'") {
          const newWikiItem = { ...wikiItem };
          delete newWikiItem._id;
          return this.saveOrUpdate(newWikiItem);
        }
        throw error;
      });
  }

  async getById(_id: string) {
    const foundWikiItem = await this.wikiItemModel.findById(_id).exec();
    if (foundWikiItem) return foundWikiItem;

    throw new CustomError({ name: 'Not Found', message: `Wiki item ${_id} not found` });
  }

  async retrieveAll() {
    const countWiki = await this.wikiItemModel.countDocuments({}).exec();
    const retrievedWiki = await this.wikiItemModel.find({}).exec();
    return {
      count: countWiki,
      list: retrievedWiki,
    };
  }
}
