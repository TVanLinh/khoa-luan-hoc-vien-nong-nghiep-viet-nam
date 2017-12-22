import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../shares/task.service";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-procedure-detail',
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['../../../form.css', './procedure-detail.component.css']
})
export class ProcedureDetailComponent extends BaseFormComponent implements OnInit {
  @Input() detail: any;
  @ViewChild("modal") modal: ModalComponent;

  constructor(public ele: ElementRef, public taskService: TaskService) {
    super(ele, taskService);
  }

  ngOnInit() {
  }

  open() {
    super.openModal(this.modal);
  }

  close() {
    super.closeModal(this.modal);
  }
}
