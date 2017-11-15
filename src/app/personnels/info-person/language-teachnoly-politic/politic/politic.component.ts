import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {PoliticModel} from "./politic.model";
import * as Collections from "typescript-collections";
import {TaskService} from "../../../../shares/task.service";
import {Config} from "../../../../shares/config";

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
    yearLicense: "2016",
    now: true
  };

  item1: PoliticModel = {
    level: "DH",
    yearLicense: "2016",
    now: false
  };

  listData = new Collections.LinkedList<PoliticModel>();

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef);
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
      level: [''],
      yearLicense: ['']
    });
  }

  addItem() {
    console.log(this.formDataPoliticAdd.value);
    //do something ------------

    this.positionUpdate = -1;
    this.closeModal(this.politicModal);

    let valueForm = this.formDataPoliticAdd.value;
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
  }

  editItem(index: number) {
    this.positionUpdate = index;
    let item  = this.listData.elementAtIndex(index);

    this.openModal(this.politicModal);
  }

  removeItem(index: number) {
    this.removeItem(index);
  }

  onSave() {
    this.changeNow();
    console.log(JSON.stringify(this.listData.toArray()));

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

  changeNow() {
    let index = this.formDataMain.value.now;
    this.toggleBoolean(this.listData);
    let temp: PoliticModel = this.listData.elementAtIndex(index);
    temp.now = true;
    this.listData.removeElementAtIndex(index);
    this.listData.add(temp, index);
  }

  getDataFromServer() {
    this.taskService.get(Config.CONTRACT_POLITIC + "?username=" + this.acount['username']).subscribe((data) => {
      if (data['politic']) {
        this.listData = this.asList(data['politic']);
      }
    });
  }

}
