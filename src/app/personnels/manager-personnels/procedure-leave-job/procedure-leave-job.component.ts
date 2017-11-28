import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {ValidService} from "../../../shares/valid.service";
import {Config} from "../../../shares/config";
import {MessageAlert} from "../../../shares/message.alert";

@Component({
  selector: 'app-procedure-leave-job',
  templateUrl: './procedure-leave-job.component.html',
  styleUrls: ['../../form.css', './procedure-leave-job.component.css']
})
export class ProcedureLeaveJobComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalLeaveJob') modalLeaveJob: ModalComponent;
  formSearch: FormGroup;
  formLeaveJob: FormGroup;
  formTouch = false;
  user: any;

  constructor(protected eleRef: ElementRef, taskService: TaskService, public  catalogFaculty: CatalogFacultyService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.formLeaveJob = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      numberDecide: ['', Validators.required],
      dateDecide: ['', Validators.required],
      contentDecide: ['', Validators.required]
    })
  }

  onProcess() {
    this.formTouch = true;

    let valueForm = this.formLeaveJob.value;
    let valid = [valueForm.numberDecide, valueForm.dateDecide, valueForm.contentDecide];
    if (!ValidService.isNotBlanks(valid) || !this.formLeaveJob.valid) {
      return;
    }

    let body = {
      numberDecide: valueForm.numberDecide,
      dateDecide: valueForm.dateDecide,
      contentDecide: valueForm.contentDecide,
      user: this.user
    };
    this.taskService.post(Config.LEAVE_JOB_URL, {data: body}).subscribe((data) => {
      this.updateMessge("Thành công ", "success");
      setTimeout(() => {
        this.formLeaveJob.reset();
        this.closeModal(this.modalLeaveJob);
      }, 2000);
    }, (err) => {
      this.updateMessge("Không thành công ", "warning");

    });

  }

  onChoiseHandler($event) {
    this.formTouch = false;
    let data = $event;
    this.user = $event;
    this.formLeaveJob.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });

    super.openModal(this.modalLeaveJob);
  }

}
