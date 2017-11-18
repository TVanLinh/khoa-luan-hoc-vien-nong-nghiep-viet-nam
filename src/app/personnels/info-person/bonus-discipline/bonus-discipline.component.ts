import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BonusDisciplineModel} from "./bonus-discipline.model";
import {TaskService} from "app/shares/task.service";
import {Config} from "../../../shares/config";

const MODE_BONUS = 1;
const MODE_DISCIPLINE = 0;


@Component({
  selector: 'app-bonus-discipline',
  templateUrl: './bonus-discipline.component.html',
  styleUrls: ['../../form.css', './bonus-discipline.component.css']
})


export class BonusDisciplineComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalBonus') modalBonus: ModalComponent;

  formData: FormGroup;
  positionUpdate: BonusDisciplineModel = null;

  listBonus = new Collections.LinkedList<BonusDisciplineModel>();
  listDiscipline = new Collections.LinkedList<BonusDisciplineModel>();
  mode: number = -1;
  initFormData: BonusDisciplineModel = {
    rankDecide: "",
    form: "",
    numberDecide: "",
    dateDecide: new Date(),
    reason: ""
  };

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      rankDecide: [this.initFormData.rankDecide],
      form: [this.initFormData.form],
      numberDecide: [this.initFormData.numberDecide],
      dateDecide: [this.initFormData.dateDecide],
      reason: [this.initFormData.reason]
    })
  }

  openModal(mode) {
    this.mode = mode;
    this.positionUpdate = null;
    super.openModal(this.modalBonus);
  }

  onSave(mode) {
    this.mode = mode;
    if (mode == MODE_DISCIPLINE) {
      super.pushDataServer(Config.DISCIPLINE_URL, "discipline", this.listDiscipline);
    } else {
      super.pushDataServer(Config.BONUS_URL, "bonus", this.listBonus);
    }
  }


  addItem() {
    //valid in here

    let valueForm = this.formData.value;
    if (this.positionUpdate == null) {
      if (this.mode == MODE_DISCIPLINE) {
        this.listDiscipline.add(valueForm);
      } else {
        this.listBonus.add(valueForm);
      }
    } else {
      if (this.mode == MODE_DISCIPLINE) {
        super.updateList(this.listDiscipline, this.positionUpdate, valueForm);
      } else {
        super.updateList(this.listBonus, this.positionUpdate, valueForm);
      }
    }

    super.closeModal(this.modalBonus);
    this.positionUpdate = null;
    this.formData.reset();
  }


  editItem(item, mode) {
    this.mode = mode;
    this.positionUpdate = item;
    this.initFormData = item;
    this.formData.setValue({
      rankDecide: [this.initFormData.rankDecide],
      form: [this.initFormData.form],
      numberDecide: [this.initFormData.numberDecide],
      dateDecide: [this.initFormData.dateDecide],
      reason: [this.initFormData.reason]
    });

    super.openModal(this.modalBonus);
  }

  removeItem(index, mode) {
    if (mode == MODE_DISCIPLINE) {
      this.listDiscipline.removeElementAtIndex(index);
    } else {
      this.listBonus.removeElementAtIndex(index);
    }
  }


  getDataFromServer() {
    super.getDataServer(Config.DISCIPLINE_URL).subscribe((data: any[]) => {
      this.listDiscipline = super.asList(data['discipline']);
      console.log(JSON.stringify(data));
    }, () => {

    });
    super.getDataServer(Config.BONUS_URL).subscribe((data: any[]) => {
      this.listBonus = super.asList(data['bonus']);
    }, () => {

    });
  }


}

