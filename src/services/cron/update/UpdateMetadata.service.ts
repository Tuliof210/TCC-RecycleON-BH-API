import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMetadataService {
  async start(data: Promise<{ locationTags: Array<string>; materials: Array<string> }>): Promise<void> {
    const { locationTags, materials } = await data;

    this.createMetadata(locationTags, 'location');
    this.createMetadata(materials, 'material');
  }

  async createMetadata(dataList: Array<string>, type: string): Promise<void> {
    dataList.forEach((data) => {
      console.log(`creating ${type} ${data}`);
    });
  }
}
