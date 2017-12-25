import {DistrictModel} from "./district.model";

export class CityModel {
  _id_: string;
  name: string;
  code: number;
  districts: DistrictModel[];
}
