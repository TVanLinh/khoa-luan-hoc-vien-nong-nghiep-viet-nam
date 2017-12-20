import {Component, ElementRef, OnInit} from '@angular/core';
import {CatalogFacultyModel} from "../../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {CatalogFacultyService} from "../../../../shares/catalog-faculty.service";
import {TaskService} from "../../../../shares/task.service";
import {BaseFormComponent} from "../../../base-form.component";
import {Config} from "../../../../shares/config";

@Component({
  selector: 'app-statistic-birthday',
  templateUrl: './statistic-birthday.component.html',
  styleUrls: ['../../../form.css', './statistic-birthday.component.css',]
})
export class StatisticBirthdayComponent extends BaseFormComponent implements OnInit {

  listQuarter = [1, 2, 3, 4];
  listFaculty: CatalogFacultyModel[] = [];
  listFaculty1: CatalogFacultyModel[] = [];
  dataUser: any[] = [];
  fields: any[] = [];
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
      },
      {
        caption: "Ngày sinh",
        field: 'birthDay',
        type: "date",
        format: 'dd/MM/yyyy'
      }
    ];
  }


  getCatalogFaculty() {
    this.catalogService.getList().subscribe((data: any[]) => {
      this.listFaculty = data;
      this.listFaculty1 = this.catalogService.findByLevel(data, 1);
    });
  }

  valueChange(quater, fac) {
    // console.log(quater + fac);
    if (quater == '-1' && fac == "-1" || quater == '-1' && fac != "-1") {
      return;
    }
    let str = '';
    if (quater != "-1" && fac == "-1") {
      str = "quater=" + quater;
    } else if (quater != '-1' && fac != '-1') {
      str = "quater=" + quater + "&organ=" + fac;
    }

    console.log(str);

    this.taskService.get(Config.USER_URL + "/birthDayAndOrgan?" + str).subscribe(data => {
      return this.dataUser = data;
    });
  }

  organChange(quater, fac) {

  }

}
