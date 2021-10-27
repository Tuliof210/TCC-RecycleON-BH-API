import { Location, LocationTag } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';
import { ILocationsRepository, ILocationsRepositoryToken } from 'src/repositories/locations';
import { LocationDTO } from 'src/shared/DTO';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { map, firstValueFrom } from 'rxjs';
import * as utm from 'utm';

type RawLocationProperties = Record<string, string | number | null>;

@Injectable()
export class UpdateLocationsService {
  private apiUrl: string;
  private reponseFormat: string;

  private locationTagsList = new Set<string>();
  private materialsList = new Set<string>();

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    @Inject(ILocationsRepositoryToken) private readonly locationsRepository: ILocationsRepository,
  ) {
    this.apiUrl = this.config.get<string>('locationsExternalApi');
    this.reponseFormat = 'outputFormat=JSON';
  }

  async start(): Promise<{ locationTags: Array<string>; materials: Array<string> }> {
    const PV = this.handleLocations({
      resource: this.requestResource('PONTO_VERDE'),
      tag: LocationTag.PV,
      idPrefix: 'ponto-verde-',
      indexIdSuffix: 'ID_LEV',
      indexName: 'NOME_LEV',
    });
    const LEV = this.handleLocations({
      resource: this.requestResource('LOCAL_ENTREGA_VOLUNTARIA'),
      tag: LocationTag.LEV,
      idPrefix: 'local-de-entrega-voluntaria-',
      indexIdSuffix: 'ID_LEV',
      indexName: 'NOME_LEV',
    });
    const URPV = this.handleLocations({
      resource: this.requestResource('URPV'),
      tag: LocationTag.URPV,
      idPrefix: 'URPV-',
      indexIdSuffix: 'ID_URPV',
      indexName: 'NOME_URPV',
    });

    try {
      await Promise.all([PV, LEV, URPV]);
      return { locationTags: Array.from(this.locationTagsList), materials: Array.from(this.materialsList) };
    } catch (error) {
      throw new CustomError({ name: 'Api Error', message: error.message });
    }
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
    tag: string;
    idPrefix: string;
    indexIdSuffix: string;
    indexName: string;
  }): Promise<Array<void | LocationDTO>> {
    const rawLocations = await context.resource;

    const locations = rawLocations.map((rawLocation): Promise<void | LocationDTO> => {
      const location = new Location({
        locationTag: context.tag,
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

      this.locationTagsList.add(context.tag);
      return this.locationsRepository.saveOrUpdate(location);
    });

    return Promise.all(locations);
  }

  //===========================================================================================

  mountCoordinates(rawCoordinates: [number, number]): [number, number] {
    const cityZone = { number: 23, letter: 'K' };
    const easting = rawCoordinates[0];
    const northing = rawCoordinates[1];

    const coordinates = utm.toLatLon(easting, northing, cityZone.number, cityZone.letter);
    return [coordinates.longitude, coordinates.latitude];
  }

  mountBusinessHours(rawProperties: RawLocationProperties) {
    return (rawProperties['HORARIO_FUNCIONAMENTO'] as string) ?? null;
  }

  mountMaterials(rawMaterials: string) {
    const materials = rawMaterials.split(';').map((material) => material.trim());

    return materials.map((material) => {
      this.materialsList.add(material);
      return material.toLowerCase();
    });
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
