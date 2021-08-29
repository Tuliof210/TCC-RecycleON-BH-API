import { QueryParamsDTO } from 'src/shared/DTO';

import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryParamsPipe implements PipeTransform {
  transform(body: Record<string, unknown>): QueryParamsDTO {
    console.log('inside pipe', body);
    return {
      query: {},
      select: {},
      cursor: {
        limit: 10,
        skip: 10,
        sort: {},
      },
    };
  }
}
