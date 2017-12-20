import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../../../shares/config";
import {TaskService} from "../../../../shares/task.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../../base-form.component";

@Component({
  selector: 'app-statistic-retired',
  templateUrl: './statistic-retired.component.html',
  styleUrls: ['./statistic-retired.component.css', '../../../form.css']
})
export class StatisticRetiredComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  data: any[] = [];
  detail: any;
  fields: { caption: string, type?: string, field: string, format?:string,width?: number }[];

  constructor(public ele: ElementRef, public taskService: TaskService) {
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
    this.taskService.get(Config.RETIRE_URL).subscribe((data: any[]) => {
      this.data = data;
    }, err => {
      this.data = [];
    });
  }

  clickHandler($event) {
    this.detail = $event;
    super.openModal(this.modal);
    console.log(JSON.stringify($event));
  }


}
