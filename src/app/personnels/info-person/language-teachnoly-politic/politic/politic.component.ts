import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../../../base-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-politic',
  templateUrl: './politic.component.html',
  styleUrls: ['../../../form.css', './politic.component.css']
})
export class PoliticComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;

  item: PliticForm = {
    level: "DH",
    yearLicense: "2016",
    now: 0
  };
  item1: PliticForm = {
    level: "DH",
    yearLicense: "2016",
    now: 1
  };


  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      level: [''],
      yearLicense: [''],
      now: [1]
    });
  }

  onSave() {
    console.log(this.formData.value);
  }
}

interface  PliticForm {
  level: string,
  yearLicense: string,
  now: number
}
