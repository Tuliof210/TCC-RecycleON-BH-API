import { ResponseInterceptor } from './interceptors';
import { TypeValidationMiddleware } from './middlewares';

import { UserModule } from './useCases/user';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest', { useCreateIndex: true, useFindAndModify: false }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(TypeValidationMiddleware)
//       .forRoutes({ path: 'users', method: RequestMethod.POST }, { path: 'users', method: RequestMethod.PUT });
//   }
// }
