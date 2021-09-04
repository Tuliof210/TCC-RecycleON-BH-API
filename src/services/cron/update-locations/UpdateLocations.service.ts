import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map, Observable } from 'rxjs';

@Injectable()
export class UpdateLocationsService {
  constructor(private readonly httpService: HttpService) {}

  private readonly URI =
    'https://bhmap.pbh.gov.br/v2/api/idebhgeo/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=namespace';

  findAll(): Observable<any[]> {
    return this.httpService
      .get(`${this.URI}:PONTO_VERDE&outputFormat=JSON`)
      .pipe(map((response) => response.data.features));
  }
}
