import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventListener} from "@angular/core/src/debug/debug_node";
import {TaskService} from "../../shares/task.service";
import {Config} from "../../shares/config";
import {BaseFormComponent} from "../base-form.component";
import {CatalogFacultyModel} from "../manager-catalog/catalog-faculty/catalog-faculty.model";
import {CatalogFacultyService} from "../../shares/catalog-faculty.service";
import {ValidService} from "../../shares/valid.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css', "../form.css"]
})
export class SearchFormComponent extends BaseFormComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onChoise = new EventEmitter<any>();

  @Input() title: string = '';
  @Input() showRole: boolean = false;

  @Input() data: any[] = [];
  staffCode: string = '';
  level1: string = '-1';
  level2: string = '-1';
  listFaculty: CatalogFacultyModel[] = [];
  listFaculty1: CatalogFacultyModel[] = [];
  listFaculty2: CatalogFacultyModel[] = [];

  @Input() fields: { caption: string, type?: string, field: string, width?: number }[];

  @Input() titleTable: string = "Danh sách cán bộ";

  constructor(protected eleRef: ElementRef, public  taskSevice: TaskService, public catalogService: CatalogFacultyService) {
    super(eleRef, taskSevice);
  }

  onSearchShare() {
    // this.onSearch.emit("Ok");

    this.staffCode = this.staffCode.trim();
    if (!ValidService.isNotBlank(this.staffCode) && this.level1 == '-1') {
      this.updateMessge("Vui lòng nhập vào họ tên, mã cán bộ hoặc chọn đơn vị cấp 1", "warning");
      return;
    }

    let query = "";
    if (this.staffCode != '' && this.level1 != '-1' && this.level2 != '-1') {
      query = "/findByUserNameAndOrgan?username=" + this.staffCode + "&level1=" + this.level1 + "&level2=" + this.level2;

      console.log("1");

    } else if (this.staffCode != '' && this.level1 != '-1' && this.level2 == '-1') {
      query = "/findByUserNameAndOrgan?username=" + this.staffCode + "&level1=" + this.level1;
      console.log("2");

    } else if (this.staffCode != '' && this.level1 == '-1') {
      query = "/findByUserNameOrFullName?username=" + this.staffCode;

      console.log("3");

    } else if (this.staffCode == '' && this.level1 != '-1' && this.level2 != '-1') {
      query = "/findByOrgan?level1=" + this.level1 + "&level2=" + this.level2;

      console.log("4");

    } else if (this.staffCode == '' && this.level1 != '-1' && this.level2 == '-1') {
      query = "/findByOrgan?level1=" + this.level1;

      console.log("5");
    }

    this.taskSevice.get(Config.USER_URL + query).subscribe((data => {
      this.data = data;
      // this.onSearch.next(this.data);
      if (!this.data || this.data.length == 0) {
        this.updateMessge("Không tìm thấy cán bộ nào" + this.staffCode, "warning");
      }
    }), err => {

    }, () => {
      console.log(" this.onSearch.next(this.data);");
      this.onSearch.emit(this.data);
    });
  }

  level1Change() {
    this.listFaculty2 = this.catalogService.findByIdParent(this.listFaculty, this.level1);
    // console.log(JSON.stringify(this.listFaculty2));
  }


  ngOnInit() {
    this.getCatalogFaculty();
    this.fields = [{
      caption: "Mã cán bộ",
      field: 'username',
      width: 100
    },
      {
        caption: "Họ tên",
        field: 'fullname'
      },
      {
        caption: "Khoa phòng ban ",
        field: 'organ.level1.name',
        type: 'date'
      }
    ];

  }

  getCatalogFaculty() {
    this.catalogService.getList().subscribe((data: any[]) => {
      // this.listFaculty = data;
      this.listFaculty = data;
      this.listFaculty1 = this.catalogService.findByLevel(data, 1);
    });
  }

  // title ="";


  onClear() {
    this.staffCode = '';
    this.level1 = '-1';
    this.level2 = '-1';
    this.listFaculty2 = [];
  }

  onChoiseShare(item) {
    this.onChoise.emit(item);
  }


}
