import {Injectable} from "@angular/core";
import {TaskService} from "./task.service";
import {Config} from "./config";
import {CatalogFacultyModel} from "../personnels/manager-catalog/catalog-faculty/catalog-faculty.model";

@Injectable()
export class CatalogFacultyService {
  share = null;
  private list: CatalogFacultyModel[] = null;

  constructor(private taskService: TaskService) {

  }

  getList() {
    if (this.share == null) {
      return this.share = this.taskService.get(Config.CATATLOG_FACUTY_URL);
    }
    return this.share;
  }


  findById(array: CatalogFacultyModel[], id) {
    if (Array.isArray(array)) {
      for (let item of array) {
        if (item._id == id) {
          return item;
        }
      }
    }
    return null
  }


  findByIdParent(array: CatalogFacultyModel[], idParent) {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => item.parent && item.parent.id == idParent);
  }

  findByLevel(array: CatalogFacultyModel[], level) {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => item.level == level);
  }

  findByNameParent(array: CatalogFacultyModel[], name) {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => item.parent && item.parent.name == name);
  }

  findByType(array: CatalogFacultyModel[], type) {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => item && item.type == type && item.level == 1
    );
  }
}
