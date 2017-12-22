import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../shares/task.service";
import {Config} from "../../../../shares/config";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ExcelService} from "../../../../shares/excel.service";
import {DateUtil} from "../../../../shares/date.service";

@Component({
  selector: 'app-statistic-leave-job',
  templateUrl: './statistic-leave-job.component.html',
  styleUrls: ['./statistic-leave-job.component.css', '../../../form.css']
})
export class StatisticLeaveJobComponent extends BaseFormComponent implements OnInit {
  @ViewChild('detailProcedure') detailProcedure: ModalComponent;
  data: any[] = [];
  detail: any;
  fields: { caption: string, type?: string, field: string, format?: string, width?: number }[];

  constructor(public ele: ElementRef, public taskService: TaskService, public excelService: ExcelService) {
    super(ele, taskService);
  }

  ngOnInit() {
    this.fields = [{
      caption: "Mã cán bộ",
      field: 'user.username',
      width: 100
    },
      {
        caption: "Họ tên",
        field: 'user.fullname'
      },
      {
        caption: "Ngày quyết định ",
        field: 'dateDecide',
        type: 'date',
        format: 'dd/MM/yyy'
      },
      {
        caption: "Số quyết định ",
        field: 'numberDecide'
      },
    ];
    this.getData();
  }

  getData() {
    this.taskService.get(Config.LEAVE_JOB_URL).subscribe((data: any[]) => {
      this.data = data;
      console.log(JSON.stringify(data));
    }, err => {
      this.data = [];
    });
  }

  clickHandler($event) {
    this.detail = $event;
    this.detailProcedure.open();
  }


  exportHandler($event) {
    let title = {
      'username': 'Mã cán bộ',
      'fullname': 'Họ tên ',
      'numberDecide': 'Số quyết định ',
      'dateDecide': 'Ngày quyết định ',
    };
    let list = [];

    for (let item of this.data) {
      let temp = {};
      temp['username'] = item.user.username;
      temp['fullname'] = item.user.fullname;
      temp['numberDecide'] = item.numberDecide;
      temp['dateDecide'] = DateUtil.toString(item.dateDecide);
      list.push(temp);
    }

    this.excelService.export("Danh sách cán bộ nghỉ việc", title, list);
  }



}
