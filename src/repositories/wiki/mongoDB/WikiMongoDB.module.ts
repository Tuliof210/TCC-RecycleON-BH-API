import { IWikiRepositoryToken } from '..';
import { WikiMongoDBRepository } from './WikiMongoDB.repository';
import { WikiCollection, WikiSchema } from './WikiMongoDB.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: WikiCollection, schema: WikiSchema }])],
  providers: [{ provide: IWikiRepositoryToken, useClass: WikiMongoDBRepository }],
  exports: [{ provide: IWikiRepositoryToken, useClass: WikiMongoDBRepository }],
})
export class WikiMongoDBRepositoryModule {}
