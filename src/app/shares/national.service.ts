import {Injectable} from "@angular/core";
import {National} from "../personnels/model/national.model";
import {TaskService} from "./task.service";
import {Http} from "@angular/http";


@Injectable()
export class NationalService {
  private URL = '/assets/data/language.json';
  public nationals: National[] = [];

  constructor(private http: Http) {
    this.getData();
  }

  private  getData() {
    // this.http.get(this.URL).map((data)=>{
    //   return data.json();
    // }).subscribe((data: any) => this.nationals = data);
  }

  getNationByCode(code: string): National {
    for (let item of this.nationals) {
      if (item.code === code) {
        return item;
      }
    }
    return new National();
  }
}
