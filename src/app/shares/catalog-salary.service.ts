import {Injectable,} from "@angular/core";
import {TaskService} from "./task.service";
import {Observable} from "rxjs/Observable";
import {Config} from "./config";
import * as Collections from "typescript-collections";

import {Util} from "./util";

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

  getAllSpeice(list: any[]) {
    let result = [];
    for (let it of list) {
      if (!Util.contains(result, 'name', it.name)) {
        result.push(it);
      }
    }
    return result;
  }

  getGroupBySpieceName(list: any[], name: String) {
    return list.filter(item => item.name === name);

  }

  findByGroupName(object: any, name: string) {
    for (let item of object.group) {
      if (item && item.name && item.name.toLowerCase().trim() == name.toLowerCase().trim()) {
        return item;
      }
    }
    return null;
  }

  findBySpiece(objects: any[], name: string) {
    for (let item of objects) {
      if (item && item.name.toLowerCase().trim() == name.toLowerCase().trim()) {
        return item;
      }
    }
    return null;
  }

  findLevelByLevels(objects: any[], level: number) {
    for (let item of objects) {
      if (item && item.name == level) {
        return item;
      }
    }
    return null;
  }

  // findByRankByLevel


  getRankByGroupNameAndSpiece(list: any[], specie: String, name: String) {
    let arry = list.filter(item => item.name == specie && item.group.name == name);
    if (arry != null && arry.length > 0) {
      return arry[0];
    }
    return null;
  }

  getSalaryByRankAndGroupAndSpice(list: any[], specie: String, name: String, le: String) {
    let arry: any[] = list.filter(item => item.name == specie && item.group.name == name);
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
