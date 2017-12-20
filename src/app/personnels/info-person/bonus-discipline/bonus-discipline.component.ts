import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BonusDisciplineModel} from "./bonus-discipline.model";
import {TaskService} from "app/shares/task.service";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";
import {until} from "selenium-webdriver";

const MODE_BONUS = 1;
const MODE_DISCIPLINE = 0;


@Component({
  selector: 'app-bonus-discipline',
  templateUrl: './bonus-discipline.component.html',
  styleUrls: ['../../form.css', './bonus-discipline.component.css']
})


export class BonusDisciplineComponent extends BaseFormComponent implements OnInit {

  @Input() user: any;
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

  formNotValid = false;
  formTouch = false;
  title = '';
  hashDataDiscip = false;
  hashDataBonus = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      rankDecide: [this.initFormData.rankDecide, Validators.required],
      form: [this.initFormData.form, Validators.required],
      numberDecide: [this.initFormData.numberDecide, Validators.required],
      dateDecide: [this.initFormData.dateDecide, Validators.required],
      reason: [this.initFormData.reason, Validators.required]
    })
  }

  openModal(mode) {
    this.mode = mode;
    if (this.mode == MODE_DISCIPLINE) {
      this.title = "Thông tin kỷ luật";
    } else {
      this.title = "Thông tin khen thưởng ";
    }
    this.positionUpdate = null;
    super.openModal(this.modalBonus);
    this.formTouch = false;
  }

  onSave(mode) {
    this.mode = mode;
    if (mode == MODE_DISCIPLINE) {
      if (this.listDiscipline.toArray().length ==0 && !this.hashDataDiscip) {
        super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
        return;
      }
      super.pushDataServer(Config.DISCIPLINE_URL, "discipline", this.listDiscipline, this.user);
    } else {
      if (this.listBonus.toArray().length ==0 && !this.hashDataBonus) {
        super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
        return;
      }
      super.pushDataServer(Config.BONUS_URL, "bonus", this.listBonus, this.user);
    }
  }


  addItem() {
    this.formTouch = true;
    //valid in here
    let valueForm = this.formData.value;

    let data: any[] = [valueForm.rankDecide, valueForm.form, valueForm.numberDecide,
      valueForm.dateDecide, valueForm.reason
    ];

    this.updateView("form-bonus-discipline", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.formNotValid = true;
    //-------------------------------------


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
    setTimeout(() => {
      this.positionUpdate = null;
      this.formData.reset();
    }, 500);
  }


  editItem(item, mode) {
    this.updateValid("form-bonus-discipline");
    this.mode = mode;
    if (this.mode == MODE_DISCIPLINE) {
      this.title = "Thông tin kỷ luật";
    } else {
      this.title = "Thông tin khen thưởng ";
    }
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
    super.getDataServer(Config.DISCIPLINE_URL, this.user).subscribe((data: any[]) => {
      if (data && data['discipline']) {
        this.listDiscipline = super.asList(data['discipline']);
        this.hashDataDiscip = true;
      }
      // console.log(JSON.stringify(data));
    }, () => {

    });
    super.getDataServer(Config.BONUS_URL, this.user).subscribe((data: any[]) => {
      if (data && data['bonus']) {
        this.listBonus = super.asList(data['bonus']);
        this.hashDataBonus = true;
      }
    }, () => {

    });
  }

  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete, this.mode);
    }
    this.mode = -1;
  }

}

