import { Location } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map, firstValueFrom } from 'rxjs';
import * as utm from 'utm';
import * as util from 'util';

type RawLocationProperties = Record<string, string | number | null>;

@Injectable()
export class UpdateLocationsService {
  private apiUrl: string;
  private reponseFormat: string;

  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) {
    this.apiUrl = this.config.get<string>('locationsExternalApi');
    this.reponseFormat = 'outputFormat=JSON';
  }

  start(): void {
    const PV = this.requestResource('PONTO_VERDE');
    const URPV = this.requestResource('URPV');
    const LEV = this.requestResource('LOCAL_ENTREGA_VOLUNTARIA');

    this.handleLocations(PV, { idPrefix: 'ponto-verde-', indexIdSuffix: 'ID_LEV', indexName: 'NOME_LEV' });
    this.handleLocations(URPV, { idPrefix: 'URPV-', indexIdSuffix: 'ID_URPV', indexName: 'NOME_URPV' });
    this.handleLocations(LEV, {
      idPrefix: 'local-de-entrega-voluntaria-',
      indexIdSuffix: 'ID_LEV',
      indexName: 'NOME_LEV',
    });
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

  //===========================================================================================

  async handleLocations(
    rawLocationsPromise: Promise<Array<Record<string, any>>>,
    context: { idPrefix: string; indexIdSuffix: string; indexName: string },
  ) {
    const mountLocation = (rawLocation: Record<string, any>): Location => {
      const name = rawLocation.properties[context.indexName];
      const idExternal = context.idPrefix + rawLocation.properties[context.indexIdSuffix];
      const coordinates = this.mountCoordinates(rawLocation.geometry.coordinates as [number, number]);
      const businessHours = this.mountBusinessHours(rawLocation.properties as RawLocationProperties);
      const materials = this.mountMaterials(rawLocation.properties['TIPO_MATERIAL_COLETADO'] as string);
      const address = this.mountAddress(rawLocation.properties as RawLocationProperties);
      const info = (rawLocation.properties.info as string) ?? null;

      return new Location({ coordinates, properties: { idExternal, name, businessHours, materials, address, info } });
    };

    const rawLocations = await rawLocationsPromise;
    const locations = rawLocations.map(mountLocation);

    console.log(`${context.idPrefix}locations`, util.inspect(locations, { depth: 4 }));
  }

  //===========================================================================================

  mountCoordinates(rawCoordinates: [number, number]): [number, number] {
    const cityZone = { number: 23, letter: 'K' };
    const easting = rawCoordinates[0];
    const northing = rawCoordinates[1];

    const coordinates = utm.toLatLon(easting, northing, cityZone.number, cityZone.letter);
    return [coordinates.latitude, coordinates.longitude];
  }

  mountBusinessHours(rawProperties: RawLocationProperties) {
    return (rawProperties['HORARIO_FUNCIONAMENTO'] as string) ?? null;
  }

  mountMaterials(rawMaterials: string) {
    return rawMaterials.split(';').map((material) => material.trim());
  }

  mountAddress(rawAddress: RawLocationProperties) {
    return {
      street: (rawAddress['NOME_LOGRADOURO'] as string) ?? null,
      number: (rawAddress['NUMERO_IMOVEL'] as string) ?? null,
      neighborhood: (rawAddress['BAIRRO'] as string) ?? null,
      region: (rawAddress['REGIONAL'] as string) ?? null,
      reference: (rawAddress['REF_LOCALIZACAO'] as string) ?? null,
    };
  }
}
