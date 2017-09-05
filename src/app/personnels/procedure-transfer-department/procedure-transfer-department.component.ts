import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";

@Component({
  selector: 'app-procedure-transfer-department',
  templateUrl: './procedure-transfer-department.component.html',
  styleUrls: ['../form.css','./procedure-transfer-department.component.css']
})
export class ProcedureTransferDepartmentComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  showFormDetail: boolean = false;

  constructor() {
    super();
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
    this.formData = this.formBuilder.group({
      infoSearch: this.formBuilder.group({
        department: [''],
        nameOrCodePersonnel: ['']
      }),
      infoPersonnel: this.formBuilder.group({
        fullName: [''],
        personnelCode: [''],
        dateOfBirth: [''],
        sex: [''],
        dateTransfer: [''],
        numberDecide: [''],
        dateDecide: [''],
        contentDecide: [''],
        unitTransfer: ['']

      })
    })
  }

  choseItem(item: any) {
    this.showFormDetail = true;
    this.formData.patchValue({
      infoPersonnel: {
        personnelCode: item.personnelCode,
        fullName: item.fullName,
        dateOfBirth: item.dateOfBirth,
        sex: item.sex
      }
    });
  }
  onSearch() {
    console.log(this.formData.value);
  }

  onProcess() {

  }

}
