import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-info-technology',
  templateUrl: './info-technology.component.html',
  styleUrls: ['../../../form.css', './info-technology.component.css']
})
export class InfoTechnologyComponent extends BaseFormComponent implements OnInit {
  @ViewChild('technologyModal') technologyModal: ModalComponent;
  formData: FormGroup;
  positionUpdate = -1;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
  }

  item: InfoTechForm = {
    level: "5",
    yearLicense: "2016",
    deadLine: "Khong thoi han"
  };


  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.formData = this.formBuilder.group({
      level: [''],
      yearLicense: [''],
      deadLine: ['']
    });
  }

  addItem() {
    console.log(this.formData.value);
    //do something.....

    this.positionUpdate = -1;

    this.closeModal(this.technologyModal);
  }

  editItem(index: number) {
    //something....
    this.positionUpdate = index;

    this.openModal(this.technologyModal);
  }

  removeItem(index: number) {

  }

  onSave() {

  }
}

interface InfoTechForm {
  level: string,
  yearLicense: string,
  deadLine: string
}
