import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-publish-info',
  templateUrl: './publish-info.component.html',
  styleUrls: ["../form.css", './publish-info.component.css']
})
export class PublishInfoComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listPublish = new Collections.LinkedList<PublishForm>();
  indexEdit = -1;

  constructor() {
    super();
    let item: PublishForm = {
      name: 'Nong hoc',
      year: 2017,
      publishCompany: 'NXBHN',
      role: ''
    };
    this.listPublish.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: ['Nong hoc'],
      year: [2017],
      publishCompany: ['NXBHN'],
      role: []
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    this.listPublish.add(valueForm);
  }

  removeItem(index: number) {
    this.listPublish.removeElementAtIndex(index);
  }

  editItem(index: number) {
    let itemEdit = this.listPublish.elementAtIndex(index);
    this.formData.setValue({
      name: itemEdit.name,
      year: itemEdit.year,
      publishCompany: itemEdit.publishCompany,
      role: itemEdit.role
    });
    this.indexEdit = index;
  }
}
interface PublishForm {
  name: string,
  year: number,
  publishCompany: string,
  role: string
}
