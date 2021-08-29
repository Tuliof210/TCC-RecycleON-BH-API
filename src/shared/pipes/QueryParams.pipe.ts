import { limitPerQuery } from 'src/constants';

import { QueryParamsDTO } from 'src/shared/DTO';

import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryParamsPipe implements PipeTransform {
  transform(body: Record<string, any>) {
    console.log('inside pipe', body);

    const select = this.mountSelect(body);
    const cursor = this.mountCursor(body);
    const query = this.mountQuery(body);

    console.log('after pipe', body, { query, select, cursor });

    return body;
    return { query, select, cursor };
  }

  private mountSelect(body: Record<string, any>) {
    return {};
  }

  private mountCursor(body: Record<string, any>) {
    const limit = isNaN(body.limit) ? limitPerQuery : 1 * body.limit;
    const skip = isNaN(body.page) ? 0 : limit * body.page - limit;
    const sort = this.mountSort(body.sort);

    return { limit, skip, sort };
  }

  private mountSort(sort: Record<string, any>) {
    return {};
  }

  private mountQuery(body: Record<string, any>) {
    const query: Record<string, any> = {};

    return query;
  }
}
