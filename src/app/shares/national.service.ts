import {Injectable} from "@angular/core";
import {National} from "../personnels/model/national.model";
import {TaskService} from "./task.service";


@Injectable()
export class NationalService {
  private URL = '/assets/data/language.json';
  public nationals: National[] = [];

  constructor(private taskService: TaskService) {
    this.getData();
  }

  private  getData() {
    this.taskService.get(this.URL).subscribe((data: any) => this.nationals = data);
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
