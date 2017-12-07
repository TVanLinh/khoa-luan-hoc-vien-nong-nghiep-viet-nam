import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {PoliticModel} from "./politic.model";
import * as Collections from "typescript-collections";
import {TaskService} from "../../../../shares/task.service";
import {Config} from "../../../../shares/config";
import {ValidService} from "../../../../shares/valid.service";

@Component({
  selector: 'app-politic',
  templateUrl: './politic.component.html',
  styleUrls: ['../../../form.css', './politic.component.css']
})
export class PoliticComponent extends BaseFormComponent implements OnInit {
  @ViewChild('politicModal') politicModal: ModalComponent;
  formDataPoliticAdd: FormGroup;
  formDataMain: FormGroup;
  positionUpdate = -1;
  positionTemp: PoliticModel = null;

  item: PoliticModel = {
    level: "DH",
    yearLicense: 2016,
    now: true
  };

  remove = false;

  item1: PoliticModel = {
    level: "DH",
    yearLicense: 2016,
    now: false
  };

  listData = new Collections.LinkedList<PoliticModel>();
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
    this.formDataMain = this.formBuilder.group({
      now: [-1]
    });

    this.formDataPoliticAdd = this.formBuilder.group({
      level: ['', Validators.required],
      yearLicense: ['', [Validators.required, Validators.min(1900), Validators.max((new Date()).getFullYear())]]
    });
  }

  openModal(politicModal) {
    super.openModal(politicModal);
    this.formDataPoliticAdd.reset();
    this.formTouch = false;
  }

  addItem() {
    //do something ------------
    this.formTouch = true;
    let valueForm = this.formDataPoliticAdd.value;

    let data = [valueForm.level, valueForm.yearLicense];

    this.updateView("politic-form", this.formDataPoliticAdd.valid);

    if (!ValidService.isNotBlanks(data) && !this.formDataPoliticAdd.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }
    this.formNotValid = false;

    ///-------------------------------------------------
    if (this.positionTemp == null) {
      this.listData.add(valueForm);
      valueForm['now'] = false;
    } else {
      let idex = this.listData.indexOf(this.positionTemp);
      this.listData.remove(this.positionTemp);
      valueForm['now'] = this.positionTemp['now'];
      this.listData.add(valueForm, idex);

    }

    this.formDataPoliticAdd.reset();
    this.positionTemp = null;
    this.closeModal(this.politicModal);
  }

  editItem(item) {
    this.updateValid("politic-form");
    this.positionTemp = item;
    this.formDataPoliticAdd.setValue({
      level: item.level,
      yearLicense: item.yearLicense,
    });
    super.openModal(this.politicModal);
  }

  removeItem(index: number) {
    this.listData.removeElementAtIndex(index);
  }

  onSave() {

    let body = {
      "politic": this.listData.toArray(),
      "staffCode": this.acount['username']
    };

    this.taskService.post(Config.CONTRACT_POLITIC, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });

  }

  change(i) {
    this.toggleBoolean(this.listData);
    let temp: PoliticModel = this.listData.elementAtIndex(i);
    if (temp != null) {
      temp.now = true;
    }
    this.remove = true;
    this.listData.removeElementAtIndex(i);
    this.listData.add(temp, i);
  }


  getDataFromServer() {
    this.taskService.get(Config.CONTRACT_POLITIC + "?username=" + this.acount['username']).subscribe((data) => {
      if (data && data['politic']) {
        this.listData = this.asList(data['politic']);
      }
    });
  }

}
