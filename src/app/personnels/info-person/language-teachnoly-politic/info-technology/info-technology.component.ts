import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {InfoTeachnologyModel} from "./info-teachnoloy.model";
import * as Collections from "typescript-collections";
import {Config} from "../../../../shares/config";
import {TaskService} from "../../../../shares/task.service";
import {ValidService} from "../../../../shares/valid.service";

@Component({
  selector: 'app-info-technology',
  templateUrl: './info-technology.component.html',
  styleUrls: ['../../../form.css', './info-technology.component.css']
})
export class InfoTechnologyComponent extends BaseFormComponent implements OnInit {
  @ViewChild('technologyModal') technologyModal: ModalComponent;
  formData: FormGroup;
  positionUpdate: InfoTeachnologyModel = null;
  listData = new Collections.LinkedList<InfoTeachnologyModel>();
  formNotValid = false;
  formTouch = false;

  constructor(protected eleRef: ElementRef, public  taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getDataFromServer();
    this.initForm();
  }


  initForm() {
    this.formData = this.formBuilder.group({
      level: ['', Validators.required],
      yearLicense: [2015, [Validators.required, Validators.min(1900), Validators.max((new Date()).getFullYear())]],
    });
  }

  addItem() {
    this.formTouch = true;
    let valueForm: InfoTeachnologyModel = this.formData.value;

    let data: any[] = [valueForm.level, valueForm.yearLicense];

    this.updateView("technology-info", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }
    this.formNotValid = false;

    ///---------------------------------------------------------
    if (this.positionUpdate == null) {
      this.listData.add(valueForm);
    } else {
      let index = this.listData.indexOf(this.positionUpdate);
      this.listData.remove(this.positionUpdate);
      this.listData.add(valueForm, index);
    }
    this.positionUpdate = null;
    this.closeModal(this.technologyModal);
  }

  editItem(item: InfoTeachnologyModel) {
    this.updateValid("technology-info");
    this.positionUpdate = item;
    console.log(JSON.stringify(item));
    this.formData.setValue({
      level: item.level,
      yearLicense: item.yearLicense
    });
    super.openModal(this.technologyModal);
  }

  openModal(modal) {
    this.positionUpdate = null;
    this.formData.reset();
    super.openModal(modal);
    this.formTouch = false;
  }

  removeItem(index: number) {
    this.listData.removeElementAtIndex(index);
  }

  onSave() {
    let body = {
      "info_technology": this.listData.toArray(),
      "staffCode": this.acount['username']
    };
    console.log(Config.INFO_TECH);
    this.taskService.post(Config.INFO_TECH, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  getDataFromServer() {
    this.taskService.get(Config.INFO_TECH + "?username=" + this.acount['username']).subscribe((data) => {
      if (data['info_technology']) {
        this.listData = this.asList(data['info_technology']);
      }
    });
  }
}
