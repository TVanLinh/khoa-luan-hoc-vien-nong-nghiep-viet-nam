import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-thesis-guide',
  templateUrl: './thesis-guide.component.html',
  styleUrls: ['../form.css', './thesis-guide.component.css']
})
export class ThesisGuideComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listThesiss = new Collections.LinkedList<ThesissForm>();
  indexEdit = -1;

  constructor() {
    super();
    let item: ThesissForm = {
      namePersonGuide: "Tran Van Linh",
      level: "Dai Hoc",
      basicTrainningOfPerson: "Hoc vien nong nghiep vn",
      role: "Huong dan",
      thesisName: "Phat trien ung dung web",
      yearGuide: "2017",
      speciesObtain: "Gioi"
    };
    this.listThesiss.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      namePersonGuide: [''],
      level: [''],
      basicTrainningOfPerson: [''],
      role: [''],
      thesisName: [''],
      yearGuide: [2016],
      speciesObtain: ['Gioi']
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    console.log("addItem after" + this.indexEdit);
    if (this.indexEdit == -1) {
      this.listThesiss.add(valueForm);
    } else {
      this.listThesiss.removeElementAtIndex(this.indexEdit);
      this.listThesiss.add(valueForm, this.indexEdit);
    }
    this.indexEdit = -1;
    console.log("addItem" + this.indexEdit);
  }

  editItem(index: number) {
    let itemEdit = this.listThesiss.elementAtIndex(index);
    this.formData.setValue({
      namePersonGuide: itemEdit.namePersonGuide,
      level: itemEdit.level,
      basicTrainningOfPerson: itemEdit.basicTrainningOfPerson,
      role: itemEdit.role,
      thesisName: itemEdit.thesisName,
      yearGuide: itemEdit.yearGuide,
      speciesObtain: itemEdit.speciesObtain
    });
    this.indexEdit = index;
  }

  removeItem(index: number) {
    this.listThesiss.removeElementAtIndex(index);
  }
}

interface ThesissForm {
  namePersonGuide: string,
  level: string,
  basicTrainningOfPerson: string,
  role: string,
  thesisName: string,
  yearGuide: string,
  speciesObtain: string
}
