import {Injectable} from "@angular/core";
import {TaskService} from "./task.service";
import {Http} from "@angular/http";
import {National} from "../personnels/model/national.model";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Config} from "./config";

@Injectable()
export class NationalService {
  private URL = Config.HOST_SERVER + '/national';
  public nationals: National[] = [];
  private subScript = new Subscription();
  private nationalShare = null;


  constructor(public  taskService: TaskService) {
    this.getData();
  }

  public getData() {

    if (this.nationalShare == null) {
      return this.nationalShare = this.taskService.get(Config.CATALOG_NATIONAL_URL);
    }
    return this.nationalShare;
  }

  getNationalByCode(national: National[], code: any): National {
    for (let item of national) {
      // console.log("item code " + item.code + " code :" + code);
      if (item.code === Number.parseInt(code)) {
        return item;
      }
    }
    return new National();
  }


}
