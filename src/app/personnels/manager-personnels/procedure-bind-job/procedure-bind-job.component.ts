import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";

import {ValidService} from "../../../shares/valid.service";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-procedure-bind-job',
  templateUrl: './procedure-bind-job.component.html',
  styleUrls: ['../../form.css', './procedure-bind-job.component.css']
})
export class ProcedureBindJobComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalBindJob') modalBindJob: ModalComponent;
  formBindJob: FormGroup;

  formTouch = false;
  user: any;

  constructor(protected eleRef: ElementRef, taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.formBindJob = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      numberDecide: ['', Validators.required],
      dateDecide: ['', Validators.required],
      contentDecide: ['', Validators.required]
    });
  }



  onProcess() {
    this.formTouch = true;

    let valueForm = this.formBindJob.value;
    let valid = [valueForm.numberDecide, valueForm.dateDecide, valueForm.contentDecide];
    if (!ValidService.isNotBlanks(valid) || !this.formBindJob.valid) {
      return;
    }

    let body = {
      numberDecide: valueForm.numberDecide,
      dateDecide: valueForm.dateDecide,
      contentDecide: valueForm.contentDecide,
      user: this.user
    };
    this.taskService.post(Config.BIND_JOB_URL, {data: body}).subscribe((data) => {
      this.updateMessge("Thành công ", "success");
      setTimeout(() => {
        this.formBindJob.reset();
        this.closeModal(this.modalBindJob);
      }, 2000);
    }, (err) => {
      this.updateMessge("Không thành công ", "warning");

    });

  }

  onChoiseHandler($event) {
    this.formTouch = false;
    let data = $event;
    this.user = $event;
    this.formBindJob.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });

    super.openModal(this.modalBindJob);
  }





}
