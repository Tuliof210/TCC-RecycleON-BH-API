import { IWikiServiceToken } from '.';
import { WikiMongoDBRepositoryModule } from 'src/repositories/wiki/mongoDB';
import { WikiController } from './Wiki.controller';
import { WikiService } from './Wiki.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [WikiMongoDBRepositoryModule],
  controllers: [WikiController],
  providers: [{ provide: IWikiServiceToken, useClass: WikiService }],
  exports: [{ provide: IWikiServiceToken, useClass: WikiService }],
})
export class WikiModule {}
