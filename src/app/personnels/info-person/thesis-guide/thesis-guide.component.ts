import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
@Component({
  selector: 'app-thesis-guide',
  templateUrl: './thesis-guide.component.html',
  styleUrls: ['../../form.css', './thesis-guide.component.css']
})
export class ThesisGuideComponent extends BaseFormComponent implements OnInit {
  @ViewChild('thesisGuide') thesisGuide: ModalComponent;
  formData: FormGroup;
  listThesiss = new Collections.LinkedList<ThesissForm>();
  positionUpdate = -1;

  constructor() {
    super();
    let item: ThesissForm = {
      namePersonGuide: "Tran Van Linh",
      level: "Dai Hoc",
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
      role: [''],
      thesisName: [''],
      yearGuide: [2016],
      speciesObtain: ['Gioi']
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    console.log("addItem after" + this.positionUpdate);
    if (this.positionUpdate == -1) {
      this.listThesiss.add(valueForm);
    } else {
      this.listThesiss.removeElementAtIndex(this.positionUpdate);
      this.listThesiss.add(valueForm, this.positionUpdate);
    }

    this.positionUpdate = -1;

    this.closeModal(this.thesisGuide);
  }

  editItem(index: number) {
    this.positionUpdate = index;

    let itemEdit = this.listThesiss.elementAtIndex(index);
    this.formData.setValue({
      namePersonGuide: itemEdit.namePersonGuide,
      level: itemEdit.level,
      role: itemEdit.role,
      thesisName: itemEdit.thesisName,
      yearGuide: itemEdit.yearGuide,
      speciesObtain: itemEdit.speciesObtain
    });

    this.openModal(this.thesisGuide);
  }

  removeItem(index: number) {
    this.listThesiss.removeElementAtIndex(index);
  }
}

interface ThesissForm {
  namePersonGuide: string,
  level: string,
  role: string,
  thesisName: string,
  yearGuide: string,
  speciesObtain: string
}
