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
  private materialsList = new Set<string>();

  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) {
    this.apiUrl = this.config.get<string>('locationsExternalApi');
    this.reponseFormat = 'outputFormat=JSON';
  }

  start(): void {
    const PV = this.handleLocations({
      resource: this.requestResource('PONTO_VERDE'),
      idPrefix: 'ponto-verde-',
      indexIdSuffix: 'ID_LEV',
      indexName: 'NOME_LEV',
    });
    // const LEV = this.handleLocations({
    //   resource: this.requestResource('LOCAL_ENTREGA_VOLUNTARIA'),
    //   idPrefix: 'local-de-entrega-voluntaria-',
    //   indexIdSuffix: 'ID_LEV',
    //   indexName: 'NOME_LEV',
    // });
    // const URPV = this.handleLocations({
    //   resource: this.requestResource('URPV'),
    //   idPrefix: 'URPV-',
    //   indexIdSuffix: 'ID_URPV',
    //   indexName: 'NOME_URPV',
    // });

    Promise.all([PV])
      .then((locations) => {
        console.log(this.materialsList);

        locations.forEach((location) => {
          console.log(util.inspect(location, { depth: 4 }));
        });
      })
      .catch((error: Error) => {
        throw new CustomError({ name: 'Api Error', message: error.message });
      });
  }

  async requestResource(resourceName: string): Promise<Array<Record<string, any>>> {
    return firstValueFrom(
      this.httpService
        .get(`${this.apiUrl}:${resourceName}&${this.reponseFormat}`)
        .pipe(map(({ data }: { data: { features: Array<Record<string, any>> } }) => data.features)),
    );
  }

  //===========================================================================================

  async handleLocations(context: {
    resource: Promise<Array<Record<string, any>>>;
    idPrefix: string;
    indexIdSuffix: string;
    indexName: string;
  }): Promise<Array<Location>> {
    const rawLocations = await context.resource;

    return rawLocations.map((rawLocation): Location => {
      return new Location({
        coordinates: this.mountCoordinates(rawLocation.geometry.coordinates as [number, number]),
        properties: {
          idExternal: context.idPrefix + rawLocation.properties[context.indexIdSuffix],
          name: rawLocation.properties[context.indexName],
          businessHours: this.mountBusinessHours(rawLocation.properties as RawLocationProperties),
          materials: this.mountMaterials(rawLocation.properties['TIPO_MATERIAL_COLETADO'] as string),
          address: this.mountAddress(rawLocation.properties as RawLocationProperties),
          info: (rawLocation.properties.info as string) ?? null,
        },
      });
    });
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
    const materials = rawMaterials.split(';').map((material) => material.trim());

    materials.forEach((material) => this.materialsList.add(material));

    return materials;
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
