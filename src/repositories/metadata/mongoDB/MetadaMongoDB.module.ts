import { IMetadataRepositoryToken } from '..';
import { MetadataMongoDBRepository } from './MetadaMongoDB.repository';
import { MetadataCollection, MetadataSchema } from './MetadaMongoDB.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: MetadataCollection, schema: MetadataSchema }])],
  providers: [{ provide: IMetadataRepositoryToken, useClass: MetadataMongoDBRepository }],
  exports: [{ provide: IMetadataRepositoryToken, useClass: MetadataMongoDBRepository }],
})
export class MetadataMongoDBRepositoryModule {}
