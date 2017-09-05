import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-procedure-bind-job',
  templateUrl: './procedure-bind-job.component.html',
  styleUrls: ['../form.css','./procedure-bind-job.component.css']
})
export class ProcedureBindJobComponent extends BaseFormComponent implements OnInit {
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
