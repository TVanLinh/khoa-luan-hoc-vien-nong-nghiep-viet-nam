import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";

@Component({
  selector: 'app-process-evention',
  templateUrl: './process-evention.component.html',
  styleUrls: ['../../form.css', './process-evention.component.css']
})
export class ProcessEventionComponent extends BaseFormComponent implements OnInit {
  @ViewChild('evention') evention: ModalComponent;

  formData: FormGroup;
  listEvention = new Collections.LinkedList<ProcessEventionForm>();
  positionUpdate = -1;

  constructor(protected eleRef: ElementRef,public taskService: TaskService) {
    super(eleRef,taskService);
    let item: ProcessEventionForm = {
      nameEvention: "Lap trinh ung dung",
      organLicense: "HVNNVN",
      dateOfIssue: "20/10/2015",
      numberAuthor: 4,
      description: "jfkjfg gfjkfgn fgkfg"
    };
    this.listEvention.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      nameEvention: ["Lap trinh ung dung"],
      organLicense: ["HVNNVN"],
      dateOfIssue: ["20/10/2015"],
      numberAuthor: [4],
      description: ["jfkjfg gfjkfgn fgkfg"]
    })
  }

  addItem() {
    let valueForm = this.formData.value;
    this.listEvention.add(valueForm);

    this.positionUpdate = -1;

    this.closeModal(this.evention);
  }

  removeItem(index: number) {
    this.listEvention.removeElementAtIndex(index);
    this.positionUpdate = index;
  }

  editItem(index: number) {

    this.openModal(this.evention);
  }

  onSave() {

  }
}

interface ProcessEventionForm {
  nameEvention: string,
  organLicense: string,
  dateOfIssue: string
  numberAuthor: number
  description: string
}
