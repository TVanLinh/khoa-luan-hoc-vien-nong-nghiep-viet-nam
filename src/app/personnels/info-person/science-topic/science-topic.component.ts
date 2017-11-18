import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {ScienceTopicModel} from "./science-topic.model";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-science-topic',
  templateUrl: './science-topic.component.html',
  styleUrls: ['../../form.css', './science-topic.component.css']
})
export class ScienceTopicComponent extends BaseFormComponent implements OnInit {
  @ViewChild('topicModal') topicModal: ModalComponent;
  formData: FormGroup;
  listScienceTopic = new Collections.LinkedList<ScienceTopicModel>();
  positionUpdate: ScienceTopicModel = null;

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
      code: [''],
      dateBegin: [new Date()],
      monthWork: [5],
      role: [''],
      level: [''],
      specieObtain: ['']
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    console.log(JSON.stringify(valueForm));
    if (this.positionUpdate == null) {
      this.listScienceTopic.add(valueForm);
    } else {
      super.updateList(this.listScienceTopic, this.positionUpdate, valueForm);
    }

    this.positionUpdate = null;
    this.closeModal(this.topicModal);
  }

  editItem(item) {
    this.formData.setValue({
      name: item.name,
      code: item.code,
      dateBegin: item.dateBegin,
      monthWork: item.monthWork,
      role: item.role,
      level: item.level,
      specieObtain: item.specieObtain
    });
    this.positionUpdate = item;
    super.openModal(this.topicModal);
  }

  removeItem(index: number) {
    this.listScienceTopic.removeElementAtIndex(index);
  }

  onSave() {
    super.pushDataServer(Config.SCIENCE_TOP_URL, "sciene_topic", this.listScienceTopic);
  }

  openModals() {
    this.positionUpdate = null;
    this.formData.reset();
    this.formData.patchValue({
      specieObtain: this.speciesObtain[0]
    });
    super.openModal(this.topicModal);
  }

  getDataFromServer() {
    super.getDataServer(Config.SCIENCE_TOP_URL).subscribe(data => {
      this.listScienceTopic = super.asList(data['sciene_topic']);
    }, (err) => {

    });
  }
}

