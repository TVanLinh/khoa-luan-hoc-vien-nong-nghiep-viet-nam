import {Component, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

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
  item: PliticForm = {
    level: "DH",
    yearLicense: "2016",
    now: 0
  };

  item1: PliticForm = {
    level: "DH",
    yearLicense: "2016",
    now: 1
  };


  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
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
  }

  editItem(index: number) {
    this.positionUpdate = index;
    //do something...............

    this.openModal(this.politicModal);
  }

  removeItem(index: number) {
    this.removeItem(index);
  }

  onSave() {
    console.log(this.formDataMain.value);
  }
}

interface  PliticForm {
  level: string,
  yearLicense: string,
  now: number
}
