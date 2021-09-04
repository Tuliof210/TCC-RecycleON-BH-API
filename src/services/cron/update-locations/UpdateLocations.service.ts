import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateLocationsService {
  constructor(private httpService: HttpService) {}

  findAll() {
    return this.httpService.get('http://localhost:3000/cats');
  }
}
