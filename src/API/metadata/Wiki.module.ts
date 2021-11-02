import { IMetadataServiceToken } from '.';
import { MetadataMongoDBRepositoryModule } from 'src/repositories/metadata/mongoDB';
import { MetadataController } from './Wiki.controller';
import { MetadataService } from './Wiki.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [MetadataMongoDBRepositoryModule],
  controllers: [MetadataController],
  providers: [{ provide: IMetadataServiceToken, useClass: MetadataService }],
  exports: [{ provide: IMetadataServiceToken, useClass: MetadataService }],
})
export class MetadataModule {}
