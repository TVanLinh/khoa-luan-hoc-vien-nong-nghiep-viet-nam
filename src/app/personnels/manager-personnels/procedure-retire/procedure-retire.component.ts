import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {ValidService} from "../../../shares/valid.service";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-procedure-retire',
  templateUrl: './procedure-retire.component.html',
  styleUrls: ['../../form.css', './procedure-retire.component.css']
})
export class ProcedureRetireComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  formDetail: FormGroup;
  formTouch = false;
  user: any;

  constructor(protected eleRef: ElementRef, public taskService: TaskService, public catalogFaculty: CatalogFacultyService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formDetail = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      numberDecide: ['', Validators.required],
      dateDecide: ['', Validators.required],
      contentDecide: ['', Validators.required]
    });
  }


  onProcess() {
    this.formTouch = true;

    let valueForm = this.formDetail.value;
    let valid = [valueForm.numberDecide, valueForm.dateDecide, valueForm.contentDecide, Validators.required];
    if (!ValidService.isNotBlanks(valid) || !this.formDetail.valid) {
      return;
    }

    let body = {
      numberDecide: valueForm.numberDecide,
      dateDecide: valueForm.dateDecide,
      contentDecide: valueForm.contentDecide,
      user: this.user
    };
    this.taskService.post(Config.RETIRE_URL, {data: body}).subscribe((data) => {
      this.updateMessge("Thành công ", "success");
      setTimeout(() => {
        this.formDetail.reset();
        this.closeModal(this.modal);
      }, 2000);
    }, (err) => {
      this.updateMessge("Không thành công ", "warning");

    });

  }

  onChoiseHandler($event) {
    this.formTouch = false;
    let data = $event;
    this.user = $event;
    this.formDetail.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });

    super.openModal(this.modal);
  }

}
