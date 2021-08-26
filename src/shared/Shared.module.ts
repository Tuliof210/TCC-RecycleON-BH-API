import {} from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ILoggerHelperToken } from './helpers';
import { LoggerHelper } from './helpers/Logger.helper';

@Global()
@Module({
  providers: [{ provide: ILoggerHelperToken, useClass: LoggerHelper }],
  exports: [{ provide: ILoggerHelperToken, useClass: LoggerHelper }],
})
export class SharedModule {}
