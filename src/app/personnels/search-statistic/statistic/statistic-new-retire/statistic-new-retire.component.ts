import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../../../shares/config";
import {TaskService} from "../../../../shares/task.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../../base-form.component";

@Component({
  selector: 'app-statistic-new-retire',
  templateUrl: './statistic-new-retire.component.html',
  styleUrls: ['./statistic-new-retire.component.css']
})
export class StatisticNewRetireComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  data: any[] = [];
  detail: any;

  constructor(public ele: ElementRef, public taskService: TaskService) {
    super(ele, taskService);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.taskService.get(Config.RETIRE_URL).subscribe((data: any[]) => {
      this.data = data;
      console.log(JSON.stringify(data));
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
