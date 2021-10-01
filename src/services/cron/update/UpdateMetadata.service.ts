import { Metadata, MetadataTag } from 'src/shared/entities';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMetadataService {
  async start(data: Promise<{ locationTags: Array<string>; materials: Array<string> }>): Promise<void> {
    const { locationTags, materials } = await data;

    this.createMetadata(locationTags, MetadataTag.location);
    this.createMetadata(materials, MetadataTag.material);
  }

  async createMetadata(tags: Array<string>, type: string): Promise<void> {
    tags.forEach((tag) => {
      console.log(new Metadata({ type, tag }));
    });
  }
}
