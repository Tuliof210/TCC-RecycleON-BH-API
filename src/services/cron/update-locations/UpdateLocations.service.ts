import { CustomError } from 'src/shared/classes';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map, firstValueFrom } from 'rxjs';

//type rawLocationData = string;

@Injectable()
export class UpdateLocationsService {
  private apiUrl: string;
  private reponseFormat: string;

  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) {
    this.apiUrl = this.config.get<string>('locationsExternalApi');
    this.reponseFormat = 'outputFormat=JSON';
  }

  async requestResource(resourceName: string): Promise<Array<Record<string, any>>> {
    try {
      return firstValueFrom(
        this.httpService
          .get(`${this.apiUrl}:${resourceName}&${this.reponseFormat}`)
          .pipe(map(({ data }: { data: { features: Array<Record<string, any>> } }) => data.features)),
      );
    } catch (error) {
      throw new CustomError({ name: 'Api Error', message: error.message });
    }
  }

  start(): void {
    const PV = this.requestResource('PONTO_VERDE');
    const LEV = this.requestResource('LOCAL_ENTREGA_VOLUNTARIA');
    const URPV = this.requestResource('URPV');

    this.updatePV(PV);
    this.updateLEV(LEV);
    this.updateURPV(URPV);
  }

  //===========================================================================================

  async updatePV(locations: Promise<Array<Record<string, any>>>) {
    const locationsPV = await locations;
    console.log({ locationsPV: locationsPV.length });
  }

  async updateLEV(locations: Promise<Array<Record<string, any>>>) {
    const locationsLEV = await locations;
    console.log({ locationsLEV: locationsLEV.length });
  }

  async updateURPV(locations: Promise<Array<Record<string, any>>>) {
    const locationsURPV = await locations;
    console.log({ locationsURPV: locationsURPV.length });
  }

  //===========================================================================================
}
