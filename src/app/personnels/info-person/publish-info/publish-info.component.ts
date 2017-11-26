import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {PublishInfoModel} from "app/personnels/info-person/publish-info/publish-info.model";
import {Config} from "../../../shares/config";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-publish-info',
  templateUrl: './publish-info.component.html',
  styleUrls: ["../../form.css", './publish-info.component.css']
})
export class PublishInfoComponent extends BaseFormComponent implements OnInit {
  @ViewChild('publish') publish: ModalComponent;
  formData: FormGroup;
  listPublish = new Collections.LinkedList<PublishInfoModel>();
  positionUpdate: PublishInfoModel = null;
  formNotValid = false;
  formTouch = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      year: [2017, [Validators.required, Validators.min(1900)]],
      publishCompany: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSave() {
    super.pushDataServer(Config.PROCESS_PUBLISH_URL, "process_publish", this.listPublish);
  }

  addItem() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    let data = [valueForm.name, valueForm.year, valueForm.publishCompany, valueForm.role];
    this.updateView("publish-info-form", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.formNotValid = false;
    //--------------------------------------
    if (this.positionUpdate == null) {
      this.listPublish.add(valueForm);
    } else {
      super.updateList(this.listPublish, this.positionUpdate, valueForm);
    }
    this.positionUpdate = null;
    this.closeModal(this.publish);
  }

  removeItem(index: number) {
    this.listPublish.removeElementAtIndex(index);
  }

  editItem(item) {
    this.positionUpdate = item;
    this.formData.setValue({
      name: item.name,
      year: item.year,
      publishCompany: item.publishCompany,
      role: item.role
    });

    this.openModal(this.publish);
  }

  openModals() {
    this.formData.reset();
    super.openModal(this.publish);
    this.formTouch = false;
  }

  getDataFromServer() {
    super.getDataServer(Config.PROCESS_PUBLISH_URL).subscribe((data) => {
      this.listPublish = super.asList(data['process_publish']);
    });
  }
}
