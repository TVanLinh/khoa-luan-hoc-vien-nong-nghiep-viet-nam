import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['../../form.css', './contract.component.css']
})
export class ContractComponent extends BaseFormComponent implements OnInit {
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
  }

  editItem(index: number) {
    let value = this.listContracts.elementAtIndex(index);
    this.formData.setValue({
      number: value.number,
      specie: value.specie,
      dateEffect: value.dateEffect,
      dateEndEffect: value.dateEndEffect,
      unitOrgan: value.unitOrgan,
      job: value.job
    });
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
