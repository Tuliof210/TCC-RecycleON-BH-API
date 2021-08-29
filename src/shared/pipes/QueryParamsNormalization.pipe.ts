import { limitPerQuery } from 'src/constants';

import { QueryParamsDTO } from 'src/shared/DTO';

import { Injectable, PipeTransform } from '@nestjs/common';

/**
 * Versao autoral do Querymen
 *
 * Esse pipe molda os request params para melhor entendimento do mongodb
 * q => buscar pelas keywords informadas: { keywords: [RegExp like "/exp/i"] }
 * select => selecionar campos para excluir ou para incluir: { [field: string]: 0 || 1 }
 * limit => cursor para tamanho maximo da resposta: { limit: 10 }
 * page => cursor para quantos resultados ignorar, simulando paginação: { skip: (page * limit - limit) }
 * sort => filtros para a query, como ordenação: { [field: string]: -1 || 1 } respectivamente, decrescente ou crescente
 * resto => parametros da query em si: { field1: value1, field2: value2 }
 */

@Injectable()
export class QueryParamsNormalizationPipe implements PipeTransform {
  transform(body: Record<string, any>): QueryParamsDTO {
    const select = this.mountSelect(body);
    const cursor = this.mountCursor(body);
    const query = this.mountQuery(body);

    return { query, select, cursor };
  }

  //-------------------------------------------------------------------

  private mountSelect(body: Record<string, any>) {
    if (body.select) {
      const rawSelect = body.select as string;
      const exclusionSelection = rawSelect.includes('-');
      const rawSelectKeys = rawSelect.split(',');

      delete body.select;
      return this.turnKeysIntoSelect(rawSelectKeys, exclusionSelection);
    }

    return {};
  }

  private turnKeysIntoSelect(selectKeys: string[], exclusionSelection: boolean) {
    const select: Record<string, number> = {};
    const value = exclusionSelection ? 0 : 1;

    const fillSelectObject = (selectKey: string) => {
      const key = selectKey.replace('-', '');
      select[key] = value;
    };

    selectKeys.forEach(fillSelectObject);
    return select;
  }

  //-------------------------------------------------------------------

  private mountCursor(body: Record<string, any>) {
    const limit = isNaN(body.limit) ? limitPerQuery : 1 * body.limit;
    const skip = isNaN(body.page) ? 0 : limit * body.page - limit;
    const sort = this.mountSort(body.sort);

    delete body.limit;
    delete body.page;
    delete body.sort;

    return { limit, skip, sort };
  }

  private mountSort(rawSort: string) {
    if (rawSort) {
      const rawSortKeys = rawSort.split(',');
      return this.turnKeysIntoSort(rawSortKeys);
    }

    return { createdAt: -1 };
  }

  private turnKeysIntoSort(sortKeys: string[]) {
    const sort: Record<string, number> = {};

    const fillSortObject = (sortKey: string) => {
      const key = sortKey.replace('-', '');
      sort[key] = sortKey.includes('-') ? -1 : 1;
    };

    sortKeys.forEach(fillSortObject);
    return sort;
  }

  //-------------------------------------------------------------------

  private mountQuery(body: Record<string, any>) {
    return body.q ? { keywords: this.mountKeywords(body.q.split(',')) } : { ...body };
  }

  private mountKeywords(keywordsList: string[]) {
    const turnStringIntoRegex = (key: string) => new RegExp(key, 'i');
    return {
      $in: keywordsList.map(turnStringIntoRegex),
    };
  }
}
