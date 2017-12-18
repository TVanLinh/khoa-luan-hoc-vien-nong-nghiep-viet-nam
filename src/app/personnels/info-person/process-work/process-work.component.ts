import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import * as Collections from "typescript-collections";
import {ProcessWorkModel} from "./process-work.model";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-process-work',
  templateUrl: './process-work.component.html',
  styleUrls: ['../../form.css', './process-work.component.css']
})
export class ProcessWorkComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @Input() user: any;
  formData: FormGroup;
  formInfoProcess: FormGroup;
  positionUpdate: ProcessWorkModel = null;
  isBelong = true;
  listCatalog: CatalogFacultyModel[] = [];
  listCatalogLevel2: CatalogFacultyModel[] = [];
  processWorks = new Collections.LinkedList<ProcessWorkModel>();
  formNotValid = false;
  formTouch = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.innitForm();
    this.getCatalogFacutlty();
    this.getDataFromServer();
  }


  innitForm() {

    this.formInfoProcess = this.formBuilder.group({
      level1: ['', Validators.required],
      organ: ['', Validators.required],
      level2: ['', Validators.required],
      now: [],// kiem nhiem
      dateFrom: ['', Validators.required],
      dateEnd: ['', Validators.required],
      position: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  onSave() {
    super.pushDataServer(Config.PROCESS_WORK_URL, 'process_work', this.processWorks,this.user);
  }

  getDataFromServer() {
    super.getDataServer(Config.PROCESS_WORK_URL,this.user).subscribe(data => {
      if (data && data['process_work']) {
        this.processWorks = super.asList(data['process_work']);
      }
    }, err => {

    });
  }

  openModals() {
    this.formTouch = false;
    this.formInfoProcess.reset();
    this.formInfoProcess.patchValue({
      now: false,
      dateFrom: (''),
      level1: '',
      level2: '',
      dateEnd: ('')
    });
    this.isBelong = true;
    super.openModal(this.modal);
  }


  addItem() {
    this.formTouch = true;
    console.log(this.isBelong);

    let valueForm = this.formInfoProcess.value;
    let data: any[] = [];
    if (this.isBelong) {
      data = [valueForm.level1, valueForm.level2, valueForm.position, valueForm.job, valueForm.dateFrom, valueForm.dateEnd];
    } else {
      data = [valueForm.organ, valueForm.position, valueForm.job, valueForm.dateFrom, valueForm.dateEnd];
    }

    this.updateView("formInfoProcess", this.formInfoProcess.valid);

    if (!ValidService.isNotBlanks(data) || this.formInfoProcess.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.formNotValid = false;
    //------------------------------------
    if (this.positionUpdate == null) {
      this.processWorks.add(this.getProcessWorkModel());
    } else {
      super.updateList(this.processWorks, this.positionUpdate, this.getProcessWorkModel());
    }

    this.positionUpdate = null;
    super.closeModal(this.modal);
  }

  editItem(item) {
    this.updateValid("formInfoProcess");

    this.positionUpdate = item;
    if (item.level2) {
      this.isBelong = true;
      this.formInfoProcess.patchValue({
        level1: item.level1,
        level2: item.level2,
        now: item.now,// kiem nhiem
        dateFrom: item.dateFrom,
        dateEnd: item.dateEnd,
        position: item.position,
        job: item.job
      });
      this.isBelong = true;
    } else {
      this.formInfoProcess.patchValue({
        organ: item.level1,
        now: item.now,// kiem nhiem
        dateFrom: item.dateFrom,
        dateEnd: item.dateEnd,
        position: item.position,
        job: item.job
      });
      this.isBelong = false;
    }

    this.openModal(this.modal);
  }

  removeItem(index: number) {
    this.processWorks.removeElementAtIndex(index);
  }

  getCatalogFacutlty() {
    this.taskService.get(Config.CATATLOG_FACUTY_URL).subscribe((data: any[]) => {
      this.listCatalog = data;
    }, err => {

    });
  }

  getProcessWorkModel() {
    let valueForm = this.formInfoProcess.value;
    let process = new ProcessWorkModel();
    process.now = valueForm.now;
    process.dateFrom = valueForm.dateFrom;
    process.dateEnd = valueForm.dateEnd;
    process.job = valueForm.job;
    process.position = valueForm.position;
    if (valueForm.organ) {
      process.level1 = valueForm.organ;
    }
    if (valueForm.level2 && valueForm.level1) {
      process.level1 = valueForm.level1;
      process.level2 = valueForm.level2;
    }

    return process;
  }

  catalogLevelChange(parentName) {
    this.listCatalogLevel2 = this.listCatalog.filter(temp => temp.parent && temp.parent.name === parentName);
    if (this.listCatalogLevel2.length > 0) {
      this.formInfoProcess.patchValue({
        level2: this.listCatalogLevel2[0].name
      });
    }
  }


  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }

}
