import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {ValidService} from "../../../shares/valid.service";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-procedure-transfer-unit-work',
  templateUrl: './procedure-transfer-unit-work.component.html',
  styleUrls: ['../../form.css', './procedure-transfer-unit-work.component.css']
})
export class ProcedureTransferUnitWorkComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  formDetail: FormGroup;
  formTouch = false;
  user: any;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  item = {
    personnelCode: "CB001",
    fullName: "Tran van linh",
    dateOfBirth: '18/08/1995',
    sex: 'Nam',
    position: ''
  };

  ngOnInit() {
    this.initForm();

  }

  initForm() {

    this.formDetail = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      dateTransfer: [''],
      numberDecide: [''],
      dateDecide: [''],
      contentDecide: [''],
      unitTransfer: ['']
    });
  }

  onSearch() {
    console.log(this.formDetail.value);
  }

  onProcess() {
    this.formTouch = true;

    let valueForm = this.formDetail.value;
    let valid = [valueForm.numberDecide,
      valueForm.dateDecide,
      valueForm.contentDecide,
      valueForm.dateTransfer,
      valueForm.unitTransfer,
    ];
    if (!ValidService.isNotBlanks(valid) || !this.formDetail.valid) {
      return;
    }

    let body = {
      numberDecide: valueForm.numberDecide,
      dateDecide: valueForm.dateDecide,
      contentDecide: valueForm.contentDecide,
      dateTransfer: valueForm.dateTransfer,
      unitTransfer: valueForm.unitTransfer,
      user: this.user
    };

    this.taskService.post(Config.LEAVE_ORGAN_URL, {data: body}).subscribe((data) => {
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
    console.log("event " + data);
    this.user = $event;
    this.formDetail.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });
    super.openModal(this.modal);
  }
}
