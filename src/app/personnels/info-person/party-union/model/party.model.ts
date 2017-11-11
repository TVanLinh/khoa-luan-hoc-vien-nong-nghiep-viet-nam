import {DetailAPUModel} from "./detail.model";

export interface PartyModel {
  dateIn: Date;//ngay vao
  dateInOfical: Date; //ngay vao chinh thuc
  placeIn: String;//noi ket nap
  process: DetailAPUModel[]
}
