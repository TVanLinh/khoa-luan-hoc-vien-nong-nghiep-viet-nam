import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {TaskService} from "../../../shares/task.service";
import {National} from "../../model/national.model";
import {ProcessTeachingModel} from "./process-teaching.model";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-process-teaching',
  templateUrl: './process-teaching.component.html',
  styleUrls: ['../../form.css', './process-teaching.component.css']
})
export class ProcessTeachingComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  formData: FormGroup;
  listTeaching = new Collections.LinkedList<ProcessTeachingModel>();
  positionUpdate = -1;
  nationals: National[] = [];


  constructor(public nationalService: NationalService, public taskService: TaskService, protected eleRef: ElementRef) {
    super(eleRef, taskService);
    let item: ProcessTeachingModel = {
      nameSubjects: "Toan cao cap ",
      levelEducation: "Đại học",
      credit: 3,
      organTeaching: 'HVNNVN',
      yearTeaching: 2015,
      languageTeaching: 'vn'
    };
    this.listTeaching.add(item);
  }

  ngOnInit() {
    this.getDataFromServer();
    this.initNationals();
    this.initForm();
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

  openModals() {
    this.formData.reset();
    this.positionUpdate = -1;
    super.openModal(this.modal);
  }

  initNationals() {
    this.nationalService.getData().subscribe(data => {
      this.nationals = data;
    });
  }

  resetForm() {
    this.formData.value({
      nameSubjects: '',
      levelEducation: '',
      credit: 3,
      organTeaching: 'HVNNVN',
      yearTeaching: 2015,
      languageTeaching: 'not'
    });
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

  removeItem(index: number) {
    this.listTeaching.removeElementAtIndex(index);
  }

  editItem(index: number) {
    this.positionUpdate = index;
    let update = this.listTeaching.elementAtIndex(index);
    this.formData.patchValue({
      nameSubjects: update.nameSubjects,
      levelEducation: update.levelEducation,
      credit: update.credit,
      organTeaching: update.organTeaching,
      yearTeaching: update.yearTeaching,
      languageTeaching: update.languageTeaching
    });

    // this.positionUpdate = -1;
    this.openModal(this.modal);
  }


  onSave() {
    //if (this.listTeaching.size() > 0) {
      super.pushDataServer(Config.PROCESS_TEACHING_URL, "process_teaching", this.listTeaching);
   // }
  }

  getDataFromServer() {
    this.getDataServer(Config.PROCESS_TEACHING_URL).subscribe((data) => {
      this.listTeaching = super.asList(data['process_teaching']);
    });
  }
}

