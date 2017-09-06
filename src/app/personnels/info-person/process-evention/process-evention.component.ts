import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-process-evention',
  templateUrl: './process-evention.component.html',
  styleUrls: ['../../form.css', './process-evention.component.css']
})
export class ProcessEventionComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listEvention = new Collections.LinkedList<ProcessEventionForm>();

  constructor() {
    super();
    let item: ProcessEventionForm = {
      nameEvention: "Lap trinh ung dung",
      organLicense: "HVNNVN",
      dateOfIssue: "20/10/2015",
      numberAuthor: 4,
      description: "jfkjfg gfjkfgn fgkfg"
    };
    this.listEvention.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      nameEvention: ["Lap trinh ung dung"],
      organLicense: ["HVNNVN"],
      dateOfIssue: ["20/10/2015"],
      numberAuthor: [4],
      description: ["jfkjfg gfjkfgn fgkfg"]
    })
  }

  addItem() {
    let valueForm = this.formData.value;
    this.listEvention.add(valueForm);
  }

  removeItem(index: number) {
    this.listEvention.removeElementAtIndex(index);
  }

  editItem(index: number) {

  }

  onSave() {

  }
}

interface ProcessEventionForm {
  nameEvention: string,
  organLicense: string,
  dateOfIssue: string
  numberAuthor: number
  description: string
}
