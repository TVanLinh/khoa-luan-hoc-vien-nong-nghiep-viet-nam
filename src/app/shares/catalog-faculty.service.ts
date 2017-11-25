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


  findByIdParent(array: CatalogFacultyModel[], idParent) {
    return array.filter(item => item.parent.id == idParent);
  }

  findByLevel(array: CatalogFacultyModel[], level) {
    return array.filter(item => item.level == level);
  }

  findByNameParent(array: CatalogFacultyModel[], name) {
    return array.filter(item => item.parent && item.parent.name == name);
  }
}
