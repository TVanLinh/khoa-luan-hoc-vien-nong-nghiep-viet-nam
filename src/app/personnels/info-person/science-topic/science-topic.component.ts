import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {ScienceTopicModel} from "./science-topic.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

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
      code: ['', Validators.required],
      dateBegin: ['', Validators.required],
      monthWork: [5, Validators.required],
      role: ['', Validators.required],
      level: ['', Validators.required],
      specieObtain: ['', Validators.required]
    });
  }

  addItem() {
    this.formTouch = true;
    let valueForm = this.formData.value;

    let data: any = [valueForm.name, valueForm.code, valueForm.dateBegin,
      valueForm.monthWork, valueForm.role, valueForm.level, valueForm.specieObtain];

    this.updateView("science-topic-form", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.formNotValid = false;
    //------------------------------------------

    if (this.positionUpdate == null) {
      this.listScienceTopic.add(valueForm);
    } else {
      super.updateList(this.listScienceTopic, this.positionUpdate, valueForm);
    }

    this.positionUpdate = null;
    this.closeModal(this.topicModal);
  }

  editItem(item) {
    this.updateValid("science-topic-form");
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
    this.formTouch = false;
  }

  getDataFromServer() {
    super.getDataServer(Config.SCIENCE_TOP_URL).subscribe(data => {
      if (data && data['sciene_topic']) {
        this.listScienceTopic = super.asList(data['sciene_topic']);
      }
    }, (err) => {

    });
  }
}

