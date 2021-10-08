import { IMetadataServiceToken } from '.';
import { MetadataMongoDBRepositoryModule } from 'src/repositories/metadata/mongoDB';
import { MetadataController } from './Metadata.controller';
import { MetadataService } from './Metadata.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [MetadataMongoDBRepositoryModule],
  controllers: [MetadataController],
  providers: [{ provide: IMetadataServiceToken, useClass: MetadataService }],
  exports: [{ provide: IMetadataServiceToken, useClass: MetadataService }],
})
export class MetadataModule {}
