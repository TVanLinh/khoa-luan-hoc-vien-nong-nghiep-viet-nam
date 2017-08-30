import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-bonus-discipline',
  templateUrl: './bonus-discipline.component.html',
  styleUrls: ['../form.css', './bonus-discipline.component.css']
})
export class BonusDisciplineComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;

  listBonus = new Collections.LinkedList<BonusDisciplineForm>();
  listDiscipline = new Collections.LinkedList<BonusDisciplineForm>();

  constructor() {
    super();
    let item:BonusDisciplineForm = {
      rankDecide: "Hoc vien",
      form: "Giay khen",
      numberDecide: "AH9",
      dateDecide: "01/2/2016",
      reason: "Hoan thanh tot nhiem vu"
    };
    this.listBonus.add(item);
    this.listDiscipline.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      bonusData: this.formBuilder.group({
        rankDecide: [''],
        form: [''],
        numberDecide: [''],
        dateDecide: [''],
        reason: ['']
      }),
      disciplineData: this.formBuilder.group({
        rankDecide: [''],
        form: [''],
        numberDecide: [''],
        dateDecide: [''],
        reason: ['']
      })
    })
  }

  onSave() {
    console.log(this.formData.value);
  }
}


interface  BonusDisciplineForm {
  rankDecide: string,
  form: string,
  numberDecide: string,
  dateDecide: string,
  reason: string
}
