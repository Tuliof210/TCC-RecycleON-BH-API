// Drop Off Locations
import { Entity } from '.';
import { CreateLocationDTO } from 'src/shared/DTO';

export enum LocationTag {
  PV = 'Ponto Verde',
  LEV = 'Local de Entrega Voluntária',
  URPV = 'URPV',
}

export class Location extends Entity {
  public type: string;
  public locationTag: string;

  public geometry: { type: string; coordinates: [number, number] };
  public properties: {
    idExternal: string;
    name: string;
    materials: Array<string>; //TODO update this when create 'material' collection
    businessHours: string; //TODO convert the string into a object with date
    address: { street: string; number: string; neighborhood: string; region: string; reference: string };
    info: string;
  };

  constructor(props: CreateLocationDTO) {
    super();

    this.type = 'Feature';
    this.locationTag = LocationTag[props.locationTag];

    this.geometry = { type: 'Point', coordinates: props.coordinates };
    this.properties = props.properties;
  }
}
