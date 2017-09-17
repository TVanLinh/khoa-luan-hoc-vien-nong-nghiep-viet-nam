import {Component, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
@Component({
  selector: 'app-process-teaching',
  templateUrl: './process-teaching.component.html',
  styleUrls: ['../../form.css', './process-teaching.component.css']
})
export class ProcessTeachingComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  formData: FormGroup;
  listTeaching = new Collections.LinkedList<ProcessTeachingForm>();
  positionUpdate = -1;

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
    if (this.positionUpdate == -1) {
      this.listTeaching.add(valueForm);
    } else {
      this.listTeaching.removeElementAtIndex(this.positionUpdate);
      this.listTeaching.add(valueForm, this.positionUpdate);
    }
    this.positionUpdate = -1;
    this.closeModal(this.modal);
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
    let update = this.listTeaching.elementAtIndex(index);

    this.formData.patchValue({
      nameSubjects: update.nameSubjects,
      levelEducation: update.levelEducation,
      credit: update.credit,
      organTeaching: update.organTeaching,
      yearTeaching: update.yearTeaching,
      languageTeaching: update.languageTeaching
    });

    this.positionUpdate = -1;

    this.openModal(this.modal);
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
