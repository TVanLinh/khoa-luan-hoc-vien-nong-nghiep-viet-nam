import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {PublishInfoModel} from "app/personnels/info-person/publish-info/publish-info.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-publish-info',
  templateUrl: './publish-info.component.html',
  styleUrls: ["../../form.css", './publish-info.component.css']
})
export class PublishInfoComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() user: any;
  @Input() editEnable = true;
  @ViewChild('publish') publish: ModalComponent;
  formData: FormGroup;
  listPublish = new Collections.LinkedList<PublishInfoModel>();
  positionUpdate: PublishInfoModel = null;
  formNotValid = false;
  formTouch = false;
  hashData = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getDataFromServer();
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
    if (this.listPublish.toArray().length == 0 && !this.hashData) {
      super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
      return;
    }

    super.pushDataServer(Config.PROCESS_PUBLISH_URL, "process_publish", this.listPublish, this.user);
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

    //--------------------------------------
    if (this.positionUpdate == null) {
      this.listPublish.add(valueForm);
    } else {
      super.updateList(this.listPublish, this.positionUpdate, valueForm);
    }

    this.closeModal(this.publish);
    setTimeout(() => {
      this.positionUpdate = null;
      this.formNotValid = false;
    }, 500);

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
    super.getDataServer(Config.PROCESS_PUBLISH_URL, this.user).subscribe((data) => {
      if (data && data['process_publish']) {
        this.listPublish = super.asList(data['process_publish']);
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
