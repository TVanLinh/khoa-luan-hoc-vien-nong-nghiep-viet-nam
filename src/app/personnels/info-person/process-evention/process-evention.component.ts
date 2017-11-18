import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {ProcessEventModel} from "./process-event.model";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-process-evention',
  templateUrl: './process-evention.component.html',
  styleUrls: ['../../form.css', './process-evention.component.css']
})
export class ProcessEventionComponent extends BaseFormComponent implements OnInit {
  @ViewChild('evention') evention: ModalComponent;

  formData: FormGroup;
  listEvention = new Collections.LinkedList<ProcessEventModel>();
  positionUpdate: ProcessEventModel = null;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);

  }

  ngOnInit() {
    this.getDataFromServer();
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: [""],
      organLicense: [""],
      dateOfIssue: [new Date()],
      numberAuthor: [4],
      description: [""]
    })
  }

  addItem() {
    let valueForm = this.formData.value;

    if (this.positionUpdate == null) {
      this.listEvention.add(valueForm);
    } else {
      super.updateList(this.listEvention, this.positionUpdate, valueForm);
    }
    this.positionUpdate = null;
    this.closeModal(this.evention);
  }

  removeItem(index: number) {
    this.listEvention.removeElementAtIndex(index);
  }

  editItem(item) {
    this.positionUpdate = item;
    this.formData.setValue({
      name: item.name,
      organLicense: item.organLicense,
      dateOfIssue: item.dateOfIssue,
      numberAuthor: item.numberAuthor,
      description: item.description
    });
    super.openModal(this.evention);
  }

  onSave() {
    super.pushDataServer(Config.PROCESS_EVENT_URL, "process_event", this.listEvention);
  }

  openModals() {
    this.formData.reset();
    super.openModal(this.evention);
  }

  getDataFromServer() {
    super.getDataServer(Config.PROCESS_EVENT_URL).subscribe(data => {
      this.listEvention = super.asList(data['process_event']);
    });
  }
}

