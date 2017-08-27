import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-family-relationship',
  templateUrl: './family-relationship.component.html',
  styleUrls: ['../form.css', './family-relationship.component.css']
})
export class FamilyRelationshipComponent extends BaseFormComponent implements OnInit {

  formData: FormGroup;
  listRelationFamily = new Collections.LinkedList<RelationFamily>();

  constructor() {
    super();
  }

  ngOnInit() {
    let a: RelationFamily ={
      relation:'Bo',
      fullName:"La Van Tai",
      birthDay:"20/6/1976",
      job:'Giao Vien',
      organ:'DH Quoc Gia',
      national:'Viet Nam'
    };
    this.listRelationFamily.add(a);
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      relation: [''],
      fullName: [''],
      birthDay: [''],
      job: [''],
      organ: [''],
      national: ['']
    })
  }

  onSave() {
    let valueForm = this.formData.value;
    console.log(valueForm);
  }

}

export interface  RelationFamily {
  relation: string,
  fullName: string,
  birthDay: string,
  job: string,
  organ: string,
  national: string
}
