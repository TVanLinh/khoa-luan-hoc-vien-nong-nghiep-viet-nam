import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";

@Component({
  selector: 'app-foreign-language',
  templateUrl: './foreign-language.component.html',
  styleUrls: ['../../../form.css', './foreign-language.component.css']
})
export class ForeignLanguageComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;

  constructor() {
    super();
  }

  item: ForeignLanguageForm = {
    name: "English",
    listen: "Tot",
    read: "Kha",
    speak: "Tot",
    write: "Kha",
    translate: "Trung binh",
    communicate: "Thanh tao"
  };

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: ["English"],
      listen: ["Tot"],
      read: ["Kha"],
      speak: ["Tot"],
      write: ["Kha"],
      translate: ["Trung binh"],
      communicate: ["Thanh tao"]
    })
  }

  onSave() {
    console.log(this.formData.value);
  }
}

interface ForeignLanguageForm {
  name: string,
  listen: string,
  read: string,
  speak: string,
  write: string,
  translate: string,
  communicate: string
}
