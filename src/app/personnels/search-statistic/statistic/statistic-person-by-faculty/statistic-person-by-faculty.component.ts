import {Component, ElementRef, OnInit} from '@angular/core';
import {CatalogFacultyModel} from "../../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {BaseFormComponent} from "../../../base-form.component";
import {TaskService} from "../../../../shares/task.service";
import {CatalogFacultyService} from "../../../../shares/catalog-faculty.service";
import {Config} from "../../../../shares/config";

@Component({
  selector: 'app-statistic-person-by-faculty',
  templateUrl: './statistic-person-by-faculty.component.html',
  styleUrls: ['./statistic-person-by-faculty.component.css']
})
export class StatisticPersonByFacultyComponent extends BaseFormComponent implements OnInit {

  listFaculty: CatalogFacultyModel[] = [];
  chooseFaculty: string = '';
  fields: any[] = [];
  dataUser: any[] = [];
  title = "Danh sách cán bộ ";

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService,
              public  catalogService: CatalogFacultyService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getCatalogFaculty();
    this.fields = [{
      caption: "Mã cán bộ",
      field: 'username',
      width: 200
    },
      {
        caption: "Họ tên",
        field: 'fullname'
      }
    ];
  }

  getCatalogFaculty() {
    this.catalogService.getList().subscribe((data: any[]) => {
      // this.listFaculty = data;
      this.listFaculty = this.catalogService.findByLevel(data, 1);
    });
  }

  onStatistic(id) {
    if (!id || id == -1) {
      return;
    }
    console.log(id);
    let temp = this.catalogService.findById(this.listFaculty, id);
    this.title = "Danh sách cán bộ  ";

    if (temp.type == 'khoa') {
      this.title += "khoa " + temp.name;
    } else {
      this.title += temp.name;
    }

    this.taskService.get(Config.USER_URL + "/faculty?id=" + id).subscribe((data) => {
      this.dataUser = data;
    }, error2 => {
      this.dataUser = [];
    });
  }

}
