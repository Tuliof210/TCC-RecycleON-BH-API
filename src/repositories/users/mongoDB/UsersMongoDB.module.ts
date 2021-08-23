import { UserCollection, UserMongoDBRepository, UserSchema } from '.';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: 'UserRespository', useClass: UserMongoDBRepository }],
  exports: [{ provide: 'UserRespository', useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
