import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMaterialsService {
  start(materials: Promise<Set<string>>): void {
    console.log(materials);
  }
}
