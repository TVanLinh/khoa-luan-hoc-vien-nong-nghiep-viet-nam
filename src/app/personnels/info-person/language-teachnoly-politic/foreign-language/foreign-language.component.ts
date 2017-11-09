import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../../shares/national.service";

@Component({
  selector: 'app-foreign-language',
  templateUrl: './foreign-language.component.html',
  styleUrls: ['../../../form.css', './foreign-language.component.css']
})
export class ForeignLanguageComponent extends BaseFormComponent implements OnInit {
  @ViewChild('languageModal') languageModal: ModalComponent;
  formData: FormGroup;

  positionUpdate = -1;

  constructor(public nationalService: NationalService, protected eleRef: ElementRef) {
    super(eleRef);
  }

  item: ForeignLanguageForm = {
    name: "English",
    listen: "Tot",
    read: "Kha",
    speak: "Tot",
    write: "Kha",
    translate: "Trung binh",
    communicate: "Thanh tao",
    branch: "listen"
  };

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: ['not'],
      listen: ["Tot"],
      read: ["Kha"],
      speak: ["Tot"],
      write: ["Kha"],
      translate: ["Trung binh"],
      communicate: ["Thanh tao"],
      branch: ['listen']
    })
  }

  resetForm() {
    this.formData.patchValue({
      name: ['not'],
      listen: ["t"],
      read: ["kh"],
      speak: ["t"],
      write: ["kh"],
      translate: ["tb"],
      communicate: ["tt"],
      branch: ['listen']
    })
  }

  onSave() {
    console.log(this.formData.value);
  }

  addItem() {
    console.log(this.formData.value);
    this.positionUpdate = -1;
    this.closeModal(this.languageModal);
    this.resetForm();
  }

  editItem(index: number) {
    this.positionUpdate = index;
    this.openModal(this.languageModal);
  }

  removeItem(index: number) {

  }
}

interface ForeignLanguageForm {
  name: string,
  listen: string,
  read: string,
  speak: string,
  write: string,
  translate: string,
  communicate: string,
  branch: string
}
