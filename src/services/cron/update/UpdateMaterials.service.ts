import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMaterialsService {
  async start(materials: Promise<Set<string>>): Promise<void> {
    console.log(await materials);
  }
}
