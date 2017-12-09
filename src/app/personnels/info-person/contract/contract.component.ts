import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ContractModel} from "./contract.model";
import {ContactService} from "./contact.service";
import {Config} from "../../../shares/config";
import {TaskService} from "../../../shares/task.service";
import {ValidService} from "../../../shares/valid.service";


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['../../form.css', './contract.component.css'],
  providers: [ContactService]
})
export class ContractComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalContract') modal: ModalComponent;

  formData: FormGroup;
  listContracts = new Collections.LinkedList<ContractModel>();
  positionUpdate = -1;
  contactType = [];

  formTouch = false;
  initData: ContractModel = {
    numberContact: "",
    specie: 0,
    dateEffect: new Date(),
    dateEndEffect: new Date(),
    unitOrgan: "",
    job: "job'"
  };

  formNotValid = false;

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService,
              public contactSevice: ContactService) {
    super(eleRef, taskService);
    this.contactType = this.contactSevice.contactType;
  }


  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  addItem() {
    this.formTouch = true;
    let valueForm = this.formData.value;

    let data = [valueForm.numberContact,
      valueForm.specie,
      valueForm.dateEffect, valueForm.dateEffect,
      valueForm.unitOrgan, valueForm.job];

    this.updateView("contract-form", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }
    this.formNotValid = false;

    //------------------------------------------

    if (this.positionUpdate > -1) {
      this.listContracts.removeElementAtIndex(this.positionUpdate);
      this.listContracts.add(valueForm, this.positionUpdate);
    } else {
      this.listContracts.add(valueForm);
    }

    this.positionUpdate = -1;

    this.closeModal(this.modal);
  }

  openModal(modalContract) {
    super.openModal(modalContract);
    this.formData.reset();
    this.positionUpdate = -1;
  }

  editItem(index: number) {
    this.updateValid("contract-form");

    this.positionUpdate = index;

    this.initData = this.listContracts.elementAtIndex(index);

    // console.log("getContact(item.specie) " + JSON.stringify(value));
    this.formData.setValue({
      numberContact: this.initData.numberContact,
      specie: this.initData.specie,
      dateEffect: this.initData.dateEffect,
      dateEndEffect: this.initData.dateEndEffect,
      unitOrgan: this.initData.unitOrgan,
      job: this.initData.job
    });

    console.log("this.formData " + JSON.stringify(this.formData.value));

    super.openModal(this.modal);
  }

  removeItem(i) {
    this.listContracts.removeElementAtIndex(i);
  }

  onSave() {

    let body = {
      "contract": this.listContracts.toArray(),
      "staffCode": this.acount['username']
    };
    this.taskService.post(Config.CONTRACT_URL, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }


  private initForm() {
    this.formData = this.formBuilder.group({
      numberContact: [this.initData.numberContact, [Validators.required]],
      specie: [this.initData.specie, Validators.required],
      dateEffect: [this.initData.dateEffect, Validators.required],
      dateEndEffect: [this.initData.dateEndEffect, Validators.required],
      unitOrgan: [this.initData.unitOrgan, Validators.required],
      job: [this.initData.job, Validators.required]
    });
  }


  getDataFromServer() {
    this.taskService.get(Config.CONTRACT_URL + "?username=" + this.acount['username']).subscribe((data) => {
      if (data && data['contract']) {
        // console.log("data['contract'] " + JSON.stringify(data['contract']));
        this.listContracts = this.asList(data['contract']);
      }
    });
  }

  getContact(type: number) {
    for (let i of  this.contactType) {
      if (i.value == type) {
        return i;
      }
    }
    return null;
  }
}
