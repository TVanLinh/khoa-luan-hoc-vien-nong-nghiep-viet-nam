import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['../form.css', './add-personnel.component.css']
})
export class AddPersonnelComponent extends BaseFormComponent implements OnInit {
  showPass = false;
  formData: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formData = this.formBuilder.group({
        organ: ['gff'],
        deparment: ['gfgf'],
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
  deparment: string,
  personnelCode: string,
  fullName: string,
  dateOfBirth: string;
  email: string,
  acountSignIn: string,
  passWord: string,
  rePassWord: string
}
