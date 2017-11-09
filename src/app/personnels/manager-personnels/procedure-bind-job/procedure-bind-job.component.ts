import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-procedure-bind-job',
  templateUrl: './procedure-bind-job.component.html',
  styleUrls: ['../../form.css', './procedure-bind-job.component.css']
})
export class ProcedureBindJobComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalBindJob') modalBindJob: ModalComponent;
  formSearch: FormGroup;
  formBindJob: FormGroup;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.formSearch = this.formBuilder.group({
      department: [''],
      nameOrCodePersonnel: ['']
    });
    this.formBindJob = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      numberDecide: [''],
      dateDecide: [''],
      contentDecide: ['']
    });
  }

  onSearch() {
    console.log(this.formSearch.value);
  }

  onProcess() {

  }
}
