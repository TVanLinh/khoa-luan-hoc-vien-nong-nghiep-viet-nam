import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";

@Component({
  selector: 'app-procedure-leave-job',
  templateUrl: './procedure-leave-job.component.html',
  styleUrls: ['../../form.css', './procedure-leave-job.component.css']
})
export class ProcedureLeaveJobComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      infoSearch: this.formBuilder.group({
        department: [''],
        nameOrCodePersonnel: ['']
      }),
      infoPersonnel: this.formBuilder.group({
        fullName: [''],
        personnelCode: [''],
        numberDecide: [''],
        dateDecide: [''],
        contentDecide: ['']
      })
    });
  }

  onSearch() {
    console.log(this.formData.value);
  }

  onProcess() {

  }
}
