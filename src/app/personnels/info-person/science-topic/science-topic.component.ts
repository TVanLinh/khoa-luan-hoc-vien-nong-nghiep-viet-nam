import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
@Component({
  selector: 'app-science-topic',
  templateUrl: './science-topic.component.html',
  styleUrls: ['../../form.css', './science-topic.component.css']
})
export class ScienceTopicComponent extends BaseFormComponent implements OnInit {
  @ViewChild('topicModal') topicModal: ModalComponent;
  formData: FormGroup;
  listScienceTopic = new Collections.LinkedList<ScienceTopicForm>();
  positionUpdate = -1;

  constructor(protected eleRef: ElementRef,public taskService: TaskService) {
    super(eleRef, taskService);
    let item: ScienceTopicForm = {
      name: "Khoa luan tot nghiep",
      code: "KHLT001",
      dateBegin: "22/12/2016",
      monthWork: 5,
      role: "Thanh vien",
      level: "Hoc vien",
      specieObtain: "Chua co"
    };
    this.listScienceTopic.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: [''],
      code: [''],
      dateBegin: ['20/10/2016'],
      monthWork: [5],
      role: [''],
      level: [''],
      specieObtain: ['']
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    if (this.positionUpdate == -1) {
      this.listScienceTopic.add(valueForm);
    } else {
      this.listScienceTopic.removeElementAtIndex(this.positionUpdate);
      this.listScienceTopic.add(valueForm, this.positionUpdate);
    }

    this.positionUpdate = -1;
    this.formData.reset();
    this.closeModal(this.topicModal);

  }

  editItem(index: number) {
    let valueEdit = this.listScienceTopic.elementAtIndex(index);
    this.formData.setValue({
      name: valueEdit.name,
      code: valueEdit.code,
      dateBegin: valueEdit.dateBegin,
      monthWork: valueEdit.monthWork,
      role: valueEdit.role,
      level: valueEdit.level,
      specieObtain: valueEdit.specieObtain
    });
    this.positionUpdate = index;
    this.openModal(this.topicModal);
  }

  removeItem(index: number) {
    this.listScienceTopic.removeElementAtIndex(index);
  }

  onSave() {

  }
}

interface ScienceTopicForm {
  name: string,
  code: string,
  dateBegin: string,
  monthWork: number,
  role: string,
  level: string,
  specieObtain: string
}
