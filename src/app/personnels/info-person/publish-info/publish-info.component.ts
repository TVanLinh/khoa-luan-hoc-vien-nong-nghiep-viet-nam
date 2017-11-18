import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {PublishInfoModel} from "app/personnels/info-person/publish-info/publish-info.model";
import {Config} from "../../../shares/config";

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

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: [''],
      year: [2017],
      publishCompany: [''],
      role: []
    });
  }

  onSave() {
    super.pushDataServer(Config.PROCESS_PUBLISH_URL, "process_publish", this.listPublish);
  }

  addItem() {
    let valueForm = this.formData.value;

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
  }

  getDataFromServer() {
    super.getDataServer(Config.PROCESS_PUBLISH_URL).subscribe((data) => {
      this.listPublish = super.asList(data['process_publish']);
    });
  }
}
