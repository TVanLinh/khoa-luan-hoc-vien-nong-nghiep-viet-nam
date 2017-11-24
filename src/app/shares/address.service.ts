import {TaskService} from "./task.service";
import {Config} from "./config";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AddressModel} from "../personnels/model/address.model";
import {DistrictModel} from "../personnels/model/district.model";

@Injectable()
export class AddressService {

  private cityShare = null;
  private guidShare = null;
  private districtShare = null;
  private share = null;
  api = "https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api";
  // api = "/";
  listCity = null;

  constructor(public taskService: TaskService) {
    /*if(this.listCity == null){
            this.taskService.get(Config.CATALOG_ADDRESS_URL +"/city").subscribe(data=>{
                this.listCity = data;
                console.log("city: "+JSON.stringify (this.listCity));
            });
        }*/
  }

  getData() {
    if (this.share == null) {
      return this.share = this.taskService.get(Config.CATALOG_ADDRESS_URL);
    }
    return this.share;
  }

  getCityById(id) {
    return this.taskService.get(this.api + "/city/" + id);
  }

  getAllCity() {
    return this.taskService.get(this.api + "/city");
  }

  getDistrictByCityID(id: number) {
    return this.taskService.get(this.api + "/city/" + id + "/district");
  }


  getGuildByDistrictId(id: number) {
    return this.taskService.get(this.api + "/district/" + id + "/ward");
  }

  getALl() {
    for (let i = 1; i < 64; i++) {
      this.getDistrictByCityID(i).subscribe((data) => {

        console.log("data  " + i + "    " + JSON.stringify(data));
      });
    }
  }

  findAddressByCityId(array: AddressModel[], id: number) {
    for (let item of array) {
      if (item.city.code == id) {
        return item;
      }
    }
    return new AddressModel();
  }

  findGuildByDistrictId(object: AddressModel, id: number) {
    for (let item of object.districts) {
      if (item.code == id) {
        return item.guids;
      }
    }
    return [];
  }
}
