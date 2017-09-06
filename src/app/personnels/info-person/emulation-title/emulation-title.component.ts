import {Component, OnInit} from "@angular/core";
import *as Collections from "typescript-collections";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
@Component({
  selector: 'app-emulation-title',
  templateUrl: './emulation-title.component.html',
  styleUrls: ['../../form.css', './emulation-title.component.css']
})
export class EmulationTitleComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listEmulation = new Collections.LinkedList<EmulationTitleForm>();

  constructor() {
    super();
    let item: EmulationTitleForm = {
      title: "Chien sy thi dua",
      dateLicense: "20/10/2014",
      numberDecide: ""
    };
    this.listEmulation.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      title: [""],
      dateLicense: ["20/10/2014"],
      numberDecide: [""]
    })
  }

  removeItem(index: number) {
    this.listEmulation.removeElementAtIndex(index);
  }

  onSave() {
    this.listEmulation.add(this.formData.value);
  }
}

interface  EmulationTitleForm {
  title: string,
  dateLicense: string,
  numberDecide: string
}
