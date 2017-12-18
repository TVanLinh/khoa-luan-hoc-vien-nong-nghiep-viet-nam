import {Component, ElementRef, OnInit} from '@angular/core';
import {CatalogFacultyModel} from "../../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {BaseFormComponent} from "../../../base-form.component";
import {TaskService} from "../../../../shares/task.service";
import {CatalogFacultyService} from "../../../../shares/catalog-faculty.service";
import {Config} from "../../../../shares/config";

@Component({
  selector: 'app-statistic-person-by-faculty',
  templateUrl: './statistic-person-by-faculty.component.html',
  styleUrls: ['../../../form.css', './statistic-person-by-faculty.component.css']
})
export class StatisticPersonByFacultyComponent extends BaseFormComponent implements OnInit {

  listFaculty: CatalogFacultyModel[] = [];
  listFaculty1: CatalogFacultyModel[] = [];
  listFaculty2: CatalogFacultyModel[] = [];
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
      this.listFaculty = data;
      this.listFaculty1 = this.catalogService.findByLevel(data, 1);
    });
  }

  level1Change(id) {
    if (!id || id == -1) {
      return;
    }

    let temp = this.catalogService.findById(this.listFaculty, id);
    this.listFaculty2 = this.catalogService.findByIdParent(this.listFaculty, id);
    this.title = "Danh sách cán bộ  ";
    this.taskService.get(Config.USER_URL + "/faculty?id=" + id).subscribe((data) => {
      this.dataUser = data;
    }, error2 => {
      this.dataUser = [];
    });
  }

  level2Change(fac, fac2) {
    if (fac != '-1' && fac2 != "-1") {
      this.taskService.get(Config.USER_URL + "/findByOrgan?level1=" + fac + "&level2=" + fac2).subscribe((data) => {
        console.log(fac, fac2);
        this.dataUser = data;
      }, error2 => {
        this.dataUser = [];
      });
    }
  }

}
