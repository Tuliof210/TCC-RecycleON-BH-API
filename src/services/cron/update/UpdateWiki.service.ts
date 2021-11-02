import { WikiDTO } from 'src/shared/DTO';
import { Wiki, WikiType } from 'src/shared/entities';
import { CustomError } from 'src/shared/classes';
import { IWikiRepository, IWikiRepositoryToken } from 'src/repositories/wiki';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

@Injectable()
export class UpdateWikiService {
  googleApiKey: string;
  wikiSpreadsheetLink: string;
  googleSpreadsheet: GoogleSpreadsheet;

  constructor(
    @Inject(IWikiRepositoryToken) private readonly wikiRepository: IWikiRepository,
    private readonly config: ConfigService,
  ) {
    this.googleApiKey = this.config.get<string>('secretkeys')['google'];
    this.wikiSpreadsheetLink = this.config.get<string>('wikiSpreadsheet');
    this.googleSpreadsheet = new GoogleSpreadsheet(this.wikiSpreadsheetLink);
  }

  async start(data: Promise<{ locationTags: Array<string>; materials: Array<string> }>): Promise<void> {
    const { locationTags, materials } = await data;

    try {
      const wikiAdditionalInformation = await this.readWikiSpreadsheet();

      await this.createWiki(locationTags, WikiType.location, wikiAdditionalInformation);
      await this.createWiki(materials, WikiType.material, wikiAdditionalInformation);
    } catch (error) {
      throw new CustomError({ name: 'Error on create wiki', message: error.message });
    }
  }

  async readWikiSpreadsheet() {
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

      return objectData as WikiDTO;
    });
  }

  convertStringToArray(stringValue: string): Array<string> {
    return stringValue.split(';');
  }

  async createWiki(tags: Array<string>, type: string, additionalInformation: Array<WikiDTO>): Promise<void> {
    tags.forEach((tag) => {
      const findAdditionalInformation = (information: WikiDTO) => information.type === type && information.tag === tag;

      const wiki = new Wiki({ type, tag });
      const { about, relatedItens, keyWords } = additionalInformation.find(findAdditionalInformation);

      wiki.about = about;
      wiki.relatedItens = relatedItens;
      wiki.keyWords = keyWords;

      this.wikiRepository.saveOrUpdate(wiki);
    });
  }
}
