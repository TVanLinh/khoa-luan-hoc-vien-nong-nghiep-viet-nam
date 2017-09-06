import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";

@Component({
  selector: 'app-info-technology',
  templateUrl: './info-technology.component.html',
  styleUrls: ['../../../form.css', './info-technology.component.css']
})
export class InfoTechnologyComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;

  constructor() {
    super();
  }

  item: InfoTechForm = {
    level: "5",
    yearLicense: "2016",
    deadLine: "Khong thoi han"
  };


  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.formData = this.formBuilder.group({
      level: [''],
      yearLicense: [''],
      deadLine: ['']
    });
  }


}

interface InfoTechForm {
  level: string,
  yearLicense: string,
  deadLine: string
}
