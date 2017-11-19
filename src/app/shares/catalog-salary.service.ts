import {Injectable,} from "@angular/core";
import {TaskService} from "./task.service";
import {Observable} from "rxjs/Observable";
import {Config} from "./config";
import  * as Collections from  "typescript-collections";
import {CatalogRankModel} from "../personnels/model/catalog-rank.model";
@Injectable()
export class CatalogSalaryService {
  subject: Observable<any> = null;

  constructor(private taskService: TaskService) {

  }

  getData() {
    if (this.subject == null) {
      return this.subject = this.taskService.get(Config.CATALOG_RANK_URL);
    }
    return this.subject;
  }

  getGroupBySpieceName(list: CatalogRankModel[], name: String) {
    return list.filter(item => item.name === name);

  }

  getRankByGroupNameAndSpiece(list: CatalogRankModel[], specie: String, name: String) {
    let arry = list.filter(item => item.name == specie && item.group.name == name);
    if (arry != null && arry.length > 0) {
      return arry[0];
    }
    return null;
  }

  getSalaryByRankAndGroupAndSpice(list: CatalogRankModel[], specie: String, name: String, le: String) {
    let arry: CatalogRankModel[] = list.filter(item => item.name == specie && item.group.name == name);
    if (arry != null && arry.length > 0) {
      let level = arry[0].group.level.filter(item => item.name == le);
      if (level != null && level.length > 0) {
        console.log(JSON.stringify(level[0]));
        return level[0].salary;
      }
    }
    return 0;
  }
}
