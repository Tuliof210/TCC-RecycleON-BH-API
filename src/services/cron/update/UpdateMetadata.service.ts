import { MetadataDTO } from 'src/shared/DTO';
import { Metadata, MetadataType } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';
import { IMetadataRepository, IMetadataRepositoryToken } from 'src/repositories/metadata';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

@Injectable()
export class UpdateMetadataService {
  googleApiKey: string;
  metadataSpreadsheetLink: string;
  googleSpreadsheet: GoogleSpreadsheet;

  constructor(
    @Inject(IMetadataRepositoryToken) private readonly metadataRepository: IMetadataRepository,
    private readonly config: ConfigService,
  ) {
    this.googleApiKey = this.config.get<string>('secretkeys')['google'];
    this.metadataSpreadsheetLink = this.config.get<string>('metadataSpreadsheet');
    this.googleSpreadsheet = new GoogleSpreadsheet(this.metadataSpreadsheetLink);
  }

  async start(data: Promise<{ locationTags: Array<string>; materials: Array<string> }>): Promise<void> {
    const { locationTags, materials } = await data;

    try {
      const metaDataAdditionalInformation = await this.readMetadataSpreadsheet();

      await this.createMetadata(locationTags, MetadataType.location, metaDataAdditionalInformation);
      await this.createMetadata(materials, MetadataType.material, metaDataAdditionalInformation);
    } catch (error) {
      throw new CustomError({ name: 'Error on create metadata', message: error.message });
    }
  }

  async readMetadataSpreadsheet() {
    this.googleSpreadsheet.useApiKey(this.googleApiKey);
    await this.googleSpreadsheet.loadInfo();

    const sheet = this.googleSpreadsheet.sheetsByIndex[0];
    const rows = await sheet.getRows();

    return this.convertXlsxToObject(rows);
  }

  convertXlsxToObject(rows: Array<GoogleSpreadsheetRow>) {
    return rows.map((row) => {
      const keys = row._sheet.headerValues as Array<string>;
      const values = row._rawData as Array<string>;

      const objectData = {};
      values.forEach((value: string, index: number) => {
        const key = keys[index];
        objectData[key] = value;
      });

      objectData['relatedItens'] = this.convertStringToArray(objectData['relatedItens']);
      objectData['keyWords'] = this.convertStringToArray(objectData['keyWords']);

      return objectData as MetadataDTO;
    });
  }

  convertStringToArray(stringValue: string): Array<string> {
    return stringValue.split(';');
  }

  async createMetadata(tags: Array<string>, type: string, additionalInformation: Array<MetadataDTO>): Promise<void> {
    tags.forEach((tag) => {
      const findAdditionalInformation = (information: MetadataDTO) =>
        information.type === type && information.tag === tag;

      const metadata = new Metadata({ type, tag });
      const { about, relatedItens, keyWords } = additionalInformation.find(findAdditionalInformation);

      metadata.about = about;
      metadata.relatedItens = relatedItens;
      metadata.keyWords = keyWords;

      this.metadataRepository.saveOrUpdate(metadata);
    });
  }
}
