import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['../../form.css', './contract.component.css']
})
export class ContractComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalContract') modal: ModalComponent;

  formData: FormGroup;
  listContracts = new Collections.LinkedList<ContractForm>();
  positionUpdate = -1;

  constructor() {
    super();
  }


  ngOnInit() {
    this.initForm();
  }

  addItem() {
    let valueForm = this.formData.value;
    if (this.positionUpdate > -1) {
      this.listContracts.removeElementAtIndex(this.positionUpdate);
      this.listContracts.add(valueForm, this.positionUpdate);
    } else {
      this.listContracts.add(valueForm);
    }

    this.positionUpdate = -1;

    this.closeModal(this.modal);
  }

  editItem(index: number) {
    this.positionUpdate = index;

    let value = this.listContracts.elementAtIndex(index);
    this.formData.setValue({
      number: value.number,
      specie: value.specie,
      dateEffect: value.dateEffect,
      dateEndEffect: value.dateEndEffect,
      unitOrgan: value.unitOrgan,
      job: value.job
    });

    this.openModal(this.modal);
  }

  removeItem(i) {
    this.listContracts.removeElementAtIndex(i);
  }

  private initForm() {
    this.formData = this.formBuilder.group({
      number: [1],
      specie: [''],
      dateEffect: ['20/10/2015'],
      dateEndEffect: ['20/10/2015'],
      unitOrgan: ['HVNNVN'],
      job: ['Lap trinh vien']
    });
  }
}

export  interface  ContractForm {
  number: string,
  specie: string,
  dateEffect: string,
  dateEndEffect: string,
  unitOrgan: string,
  job: string
}
