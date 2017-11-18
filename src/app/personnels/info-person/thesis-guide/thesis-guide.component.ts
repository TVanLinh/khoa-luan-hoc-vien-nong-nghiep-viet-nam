import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {ThesissGuideModel} from "./thesiss-guide.model";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-thesis-guide',
  templateUrl: './thesis-guide.component.html',
  styleUrls: ['../../form.css', './thesis-guide.component.css']
})
export class ThesisGuideComponent extends BaseFormComponent implements OnInit {
  @ViewChild('thesisGuide') thesisGuide: ModalComponent;
  formData: FormGroup;
  listThesiss = new Collections.LinkedList<ThesissGuideModel>();
  positionUpdate: ThesissGuideModel = null;


  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      namePersonGuide: [''],
      level: [this.rankTrains[0]],
      role: [''],
      thesisName: [''],
      yearGuide: [2016],
      speciesObtain: [this.speciesObtain[0]]
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    console.log(JSON.stringify(valueForm));
    if (this.positionUpdate == null) {
      this.listThesiss.add(valueForm);
    } else {
      super.updateList(this.listThesiss, this.positionUpdate, valueForm);
    }

    this.positionUpdate = null;
    this.closeModal(this.thesisGuide);
  }

  editItem(item) {
    this.positionUpdate = item;

    this.formData.setValue({
      namePersonGuide: item.namePersonGuide,
      level: item.level,
      role: item.role,
      thesisName: item.thesisName,
      yearGuide: item.yearGuide,
      speciesObtain: item.speciesObtain
    });

    this.openModal(this.thesisGuide);
  }

  removeItem(index: number) {
    this.listThesiss.removeElementAtIndex(index);
  }

  openModals() {
    this.positionUpdate = null;
    super.openModal(this.thesisGuide);
    this.formData.reset();
    this.formData.patchValue({
      level: this.rankTrains[0],
      speciesObtain: this.speciesObtain[0]
    })
  }

  onSave() {
    this.pushDataServer(Config.THESIS_GUIDE_URL, 'thesis_guide', this.listThesiss);
  }

  getDataFromServer() {
    super.getDataServer(Config.THESIS_GUIDE_URL).subscribe((data: any[]) => {
      this.listThesiss = super.asList(data['thesis_guide']);
    });
  }
}
