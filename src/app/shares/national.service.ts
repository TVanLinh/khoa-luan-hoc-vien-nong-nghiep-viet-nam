import {Injectable} from "@angular/core";
import {TaskService} from "./task.service";
import {Http} from "@angular/http";
import {National} from "../personnels/model/national.model";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NationalService {
  private URL = 'http://localhost:3000/api/national';
  public nationals: National[] = [];
  private subScript = new Subscription();
  private nationalShare = null;

  constructor(public  taskService: TaskService) {
    this.getData();
  }

  public getData() {

    if (this.nationalShare == null) {
      return this.nationalShare = this.taskService.get(this.URL);
    }
    return this.nationalShare;
  }

  getNationalByCode(national: National[], code: string): National {
    for (let item of national) {
      if (item.code === code) {
        return item;
      }
    }
    return new National();
  }


}
