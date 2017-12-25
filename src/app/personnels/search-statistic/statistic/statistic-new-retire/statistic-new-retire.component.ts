import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../../../shares/config";
import {TaskService} from "../../../../shares/task.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../../base-form.component";
import * as Collections from "typescript-collections";

@Component({
  selector: 'app-statistic-new-retire',
  templateUrl: './statistic-new-retire.component.html',
  styleUrls: ['../../../form.css', './statistic-new-retire.component.css']
})
export class StatisticNewRetireComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  data: any[] = [];
  detail: any;
  dateNow = (new Date()).getFullYear();
  // month = 1;
  fields: any[] = [];
  title = "Danh sách cán bộ nghỉ hưu dự kiến";
  dataUser = [];

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
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
      }, {
        caption: "Đơn vị",
        field: "organ.level1.name"
      }
    ];
  }


  getData() {


    var temp = new Collections.LinkedList<any>();

    this.taskService.get(Config.USER_RETIRE_LEAVE_BIND_JOB).subscribe((data => {
      temp = super.asList(data);
    }), err => {

    }, () => {
      this.taskService.get(Config.RETIRE_URL).subscribe(users => {
        let userTemp = super.asList(users);
        for (let it of userTemp.toArray()) {
          for (let item of temp.toArray()) {
            if (it && item
              && ((it._id == item._id || it.username == item.username ))) {
              userTemp.remove(it);
            }
          }
        }
        this.data = userTemp.toArray();
        // if (!this.data || this.data.length == 0) {
        //   this.updateMessge("Không tìm thấy cán bộ nào", "warning");
        // }
      }, err => {
      }, () => {

      });
    });


    // this.taskService.get(Config.RETIRE_URL + "").subscribe((data: any[]) => {
    //   this.data = data;
    //   console.log(JSON.stringify(data));
    // }, err => {
    //   this.data = [];
    // });
  }

  valueChange(month, year) {
    let m = Number.parseInt(month);
    let y = Number.parseInt(year);
    if (y < this.dateNow) {
      this.title = "Danh sách cán bộ nghỉ hưu dự kiến";
      this.dataUser = [];
      return;
    }
    if (y >= this.dateNow) {
      this.title = "Danh sách cán bộ nghỉ hưu dự kiến vào tháng " + month + " năm " + year;
    }

    var temp = new Collections.LinkedList<any>();
    this.taskService.get(Config.USER_RETIRE_LEAVE_BIND_JOB).subscribe((data => {
      temp = super.asList(data);
    }), err => {

    }, () => {
      this.taskService.get(Config.RETIRE_URL + "/new?month=" + m + "&year=" + y).subscribe(users => {
        let userTemp = super.asList(users);
        for (let it of userTemp.toArray()) {
          for (let item of temp.toArray()) {
            if (it && item
              && ((it._id == item._id || it.username == item.username ))) {
              userTemp.remove(it);
            }
          }
        }
        this.dataUser = userTemp.toArray();
        // if (!this.data || this.data.length == 0) {
        //   this.updateMessge("Không tìm thấy cán bộ nào", "warning");
        // }
      }, err => {
      }, () => {

      });
    });
    //
    // this.taskService.get(Config.RETIRE_URL + "/new?month=" + m + "&year=" + y).subscribe(data => {
    //   console.log(JSON.stringify(data));
    //   this.dataUser = data;
    //
    // });
  }

  checkValid(date) {
    let temp = 0;
    if ((temp = Number.parseInt(date))) {
      if (temp < this.dateNow) {
        return {
          valid: false,
          msg: "Vui lòng nhập năm lớn hơn hoặc bằng năm hiện tại"
        };
      }
      return true;
    }
    return {
      valid: false,
      msg: "Bạn nhập năm quá lớn"
    };
  }

}
