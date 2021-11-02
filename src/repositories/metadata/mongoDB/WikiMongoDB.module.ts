import { IMetadataRepositoryToken } from '..';
import { MetadataMongoDBRepository } from './WikiMongoDB.repository';
import { MetadataCollection, MetadataSchema } from './WikiMongoDB.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: MetadataCollection, schema: MetadataSchema }])],
  providers: [{ provide: IMetadataRepositoryToken, useClass: MetadataMongoDBRepository }],
  exports: [{ provide: IMetadataRepositoryToken, useClass: MetadataMongoDBRepository }],
})
export class MetadataMongoDBRepositoryModule {}
