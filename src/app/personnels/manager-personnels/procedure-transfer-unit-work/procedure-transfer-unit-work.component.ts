import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-procedure-transfer-unit-work',
  templateUrl: './procedure-transfer-unit-work.component.html',
  styleUrls: ['../../form.css', './procedure-transfer-unit-work.component.css']
})
export class ProcedureTransferUnitWorkComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  formSearch: FormGroup;
  formDetail: FormGroup;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
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

  choseItem(item: any) {

    this.formDetail.patchValue({
        personnelCode: item.personnelCode,
        fullName: item.fullName,
        dateOfBirth: item.dateOfBirth,
        sex: item.sex
    });
    this.openModal(this.modal);
  }

  onSearch() {
    console.log(this.formDetail.value);
  }

  onProcess() {

  }
}
