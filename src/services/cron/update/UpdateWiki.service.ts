import { WikiItemDTO } from 'src/shared/DTO';
import { WikiItem, WikiItemType } from 'src/shared/entities';
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
      const wikiItemsData = await this.readWikiSpreadsheet();

      await this.createWikiItem(locationTags, WikiItemType.location, wikiItemsData);
      await this.createWikiItem(materials, WikiItemType.material, wikiItemsData);
    } catch (error) {
      throw new CustomError({ name: 'Error on update wiki', message: error.message });
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

      objectData['relatedItems'] = this.convertStringToArray(objectData['relatedItems']);
      objectData['keyWords'] = this.convertStringToArray(objectData['keyWords']);

      return objectData as WikiItemDTO;
    });
  }

  convertStringToArray(stringValue: string): Array<string> {
    return stringValue.split(';');
  }

  async createWikiItem(tags: Array<string>, type: string, additionalInformation: Array<WikiItemDTO>): Promise<void> {
    tags.forEach((tag) => {
      const findAdditionalInformation = (information: WikiItemDTO) =>
        information.type === type && information.tag === tag;

      const wikiItem = new WikiItem({ type, tag });
      const { about, relatedItems, keyWords } = additionalInformation.find(findAdditionalInformation);

      wikiItem.about = about;
      wikiItem.relatedItems = relatedItems;
      wikiItem.keyWords = keyWords;

      this.wikiRepository.saveOrUpdate(wikiItem);
    });
  }
}
