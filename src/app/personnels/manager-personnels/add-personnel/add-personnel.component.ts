import {Component, ElementRef, OnInit} from "@angular/core";

import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['../../form.css', './add-personnel.component.css']
})
export class AddPersonnelComponent extends BaseFormComponent implements OnInit {
  showPass = false;
  formData: FormGroup;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formData = this.formBuilder.group({
        organ: ['gff'],
      department: ['gfgf'],
        personnelCode: [''],
        fullName: [''],
        email: [''],
        dateOfBirth: [''],
        acountSignIn: [''],
        passWord: [''],
        rePassWord: ['']
    });
  }

  onSubmit() {
    let infoPerson: AddPersonnelForm = this.formData.value;
    console.log(infoPerson);
  }

}

interface  AddPersonnelForm {
  organ: string,
  department: string,
  personnelCode: string,
  fullName: string,
  dateOfBirth: string;
  email: string,
  acountSignIn: string,
  passWord: string,
  rePassWord: string
}
