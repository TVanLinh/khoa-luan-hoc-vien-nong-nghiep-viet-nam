import {Component, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-procedure-retire',
  templateUrl: './procedure-retire.component.html',
  styleUrls: ['../../form.css', './procedure-retire.component.css']
})
export class ProcedureRetireComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  formSearch: FormGroup;
  formDetail: FormGroup;


  constructor() {
    super();
  }

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
