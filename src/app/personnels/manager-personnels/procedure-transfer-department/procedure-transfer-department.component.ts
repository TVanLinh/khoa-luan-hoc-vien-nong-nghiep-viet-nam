import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";

@Component({
  selector: 'app-procedure-transfer-department',
  templateUrl: './procedure-transfer-department.component.html',
  styleUrls: ['../../form.css', './procedure-transfer-department.component.css']
})
export class ProcedureTransferDepartmentComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  formSearch: FormGroup;
  formDetail: FormGroup;
  showFormDetail: boolean = false;

  constructor(protected eleRef: ElementRef, taskService: TaskService) {
    super(eleRef,taskService);
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
    this.formSearch = this.formBuilder.group({
      department: [''],
      nameOrCodePersonnel: ['']
    });
    this.formDetail = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      dateOfBirth: [''],
      sex: [''],
      dateTransfer: [''],
      numberDecide: [''],
      dateDecide: [''],
      contentDecide: [''],
      unitTransfer: ['']
    });
  }

  onChoiseHandler($event) {
    let data = $event;
    console.log("event " + data);
    this.formDetail.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });
    super.openModal(this.modal);
  }

  onSearch() {
    console.log(this.formSearch.value);
  }

  onProcess() {

  }

}
