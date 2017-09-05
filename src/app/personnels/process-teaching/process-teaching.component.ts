import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-process-teaching',
  templateUrl: './process-teaching.component.html',
  styleUrls: ['../form.css', './process-teaching.component.css']
})
export class ProcessTeachingComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listTeaching = new Collections.LinkedList<ProcessTeachingForm>();

  constructor() {
    super();
    let item: ProcessTeachingForm = {
      nameSubjects: "Toan cao cap ",
      levelEducation: "Dai hoc",
      credit: 3,
      organTeaching: 'HVNNVN',
      yearTeaching: 2015,
      languageTeaching: 'vn'
    };
    this.listTeaching.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  addItem() {
    let valueForm = this.formData.value;
    this.listTeaching.add(valueForm);
  }

  initForm() {
    this.formData = this.formBuilder.group({
      nameSubjects: [''],
      levelEducation: [''],
      credit: [3],
      organTeaching: ['HVNNVN'],
      yearTeaching: [2015],
      languageTeaching: ['vn']
    });
  }

  removeItem(index: number) {
    this.listTeaching.removeElementAtIndex(index);
  }

  editItem(index: number) {

  }

  onSave() {

  }
}
interface   ProcessTeachingForm {
  nameSubjects: string,
  levelEducation: string,
  credit: number,
  organTeaching: string,
  yearTeaching: number,
  languageTeaching: string
}
