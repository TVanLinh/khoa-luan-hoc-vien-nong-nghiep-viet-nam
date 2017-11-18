import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
@Component({
  selector: 'app-publish-info',
  templateUrl: './publish-info.component.html',
  styleUrls: ["../../form.css", './publish-info.component.css']
})
export class PublishInfoComponent extends BaseFormComponent implements OnInit {
  @ViewChild('publish') publish: ModalComponent;
  formData: FormGroup;
  listPublish = new Collections.LinkedList<PublishForm>();
  positionUpdate = -1;

  constructor(protected eleRef: ElementRef,public taskService: TaskService) {
    super(eleRef,taskService);
    let item: PublishForm = {
      name: 'Nong hoc',
      year: 2017,
      publishCompany: 'NXBHN',
      role: ''
    };
    this.listPublish.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: ['Nong hoc'],
      year: [2017],
      publishCompany: ['NXBHN'],
      role: []
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    this.listPublish.add(valueForm);

    this.positionUpdate = -1;

    this.closeModal(this.publish);
  }

  removeItem(index: number) {
    this.listPublish.removeElementAtIndex(index);

  }

  editItem(index: number) {
    let itemEdit = this.listPublish.elementAtIndex(index);
    this.formData.setValue({
      name: itemEdit.name,
      year: itemEdit.year,
      publishCompany: itemEdit.publishCompany,
      role: itemEdit.role
    });

    this.positionUpdate = index;
    this.openModal(this.publish);
  }
}
interface PublishForm {
  name: string,
  year: number,
  publishCompany: string,
  role: string
}
