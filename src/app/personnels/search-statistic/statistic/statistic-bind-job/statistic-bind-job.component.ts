import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../../shares/task.service";
import {Config} from "../../../../shares/config";
import {ProcedureDetailComponent} from "../procedure-detail/procedure-detail.component";

@Component({
  selector: 'app-statistic-bind-job',
  templateUrl: './statistic-bind-job.component.html',
  styleUrls: ['./statistic-bind-job.component.css', '../../../form.css']
})
export class StatisticBindJobComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('detailProcedure') detailProcedure: ProcedureDetailComponent;

  data: any[] = [];
  detail: any;
  fields: { caption: string, type?: string, field: string, width?: number }[];

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
        type: 'date'
      },
      {
        caption: "Số quyết định ",
        field: 'numberDecide'
      },
    ];
    this.getData();
  }

  getData() {
    this.taskService.get(Config.BIND_JOB_URL).subscribe((data: any[]) => {
      this.data = data;
    }, err => {
      this.data = [];
    });
  }

  clickHandler($event) {
    this.detail = $event;
    this.detailProcedure.open();
    // super.openModal(this.modal);
  }

}
