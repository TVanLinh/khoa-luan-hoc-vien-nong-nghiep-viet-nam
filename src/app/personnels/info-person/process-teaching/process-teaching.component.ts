import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {TaskService} from "../../../shares/task.service";
import {National} from "../../model/national.model";
import {ProcessTeachingModel} from "./process-teaching.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-process-teaching',
  templateUrl: './process-teaching.component.html',
  styleUrls: ['../../form.css', './process-teaching.component.css']
})
export class ProcessTeachingComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @Input() editEnable = true;
  @ViewChild('modal') modal: ModalComponent;
  formData: FormGroup;
  listTeaching = new Collections.LinkedList<ProcessTeachingModel>();
  positionUpdate = -1;
  nationals: National[] = [];

  formNotValid = false;
  formTouch = false;
  hashData = false;

  constructor(public nationalService: NationalService, public taskService: TaskService, protected eleRef: ElementRef) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getDataFromServer();
    this.initNationals();
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      nameSubjects: ['', Validators.required],
      levelEducation: ['', Validators.required],
      credit: [1],
      organTeaching: [''],
      yearTeaching: [this.minYear, [Validators.required, Validators.min(1900)]],
      languageTeaching: [0, Validators.required]
    });
  }

  openModals() {
    this.formData.reset();
    this.positionUpdate = -1;
    super.openModal(this.modal);
    this.formTouch = false;
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
      languageTeaching: 0
    });
  }

  addItem() {
    this.formTouch = true;

    let valueForm = this.formData.value;
    console.log(JSON.stringify(valueForm));

    let data: any[] = [valueForm.levelEducation, valueForm.organTeaching,
      valueForm.yearTeaching, valueForm.languageTeaching];


    this.updateView("process-teaching", this.formData.valid);

    if (!ValidService.isNotBlanks(data) && !this.formData.valid || valueForm.yearTeaching < this.minYear || this.parseInt(valueForm.languageTeaching) == 0) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }


    this.formNotValid = false;

    //--------------------------------------------
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
    this.updateValid("process-teaching");
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
    if (this.listTeaching.toArray().length == 0 && !this.hashData) {
      super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
      return;
    }
    //if (this.listTeaching.size() > 0) {
    super.pushDataServer(Config.PROCESS_TEACHING_URL, "process_teaching", this.listTeaching, this.user);
    // }
  }

  getDataFromServer() {
    this.getDataServer(Config.PROCESS_TEACHING_URL, this.user).subscribe((data) => {
      if (data && data['process_teaching']) {
        this.listTeaching = super.asList(data['process_teaching']);
        this.hashData = true;
      }
    });
  }


  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }

}

