import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
@Component({
  selector: 'app-bonus-discipline',
  templateUrl: './bonus-discipline.component.html',
  styleUrls: ['../../form.css', './bonus-discipline.component.css']
})
export class BonusDisciplineComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalDiscipline') modalDiscipline: ModalComponent;
  @ViewChild('modalBonus') modalBonus: ModalComponent;
  formDataDiscipline: FormGroup;
  formDataBonus: FormGroup;

  positionUpdateDiscip = -1;
  positionUpdateBonus  = -1;
  listBonus = new Collections.LinkedList<BonusDisciplineForm>();
  listDiscipline = new Collections.LinkedList<BonusDisciplineForm>();

  constructor() {
    super();
    let item: BonusDisciplineForm = {
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
    this.formDataDiscipline = this.formBuilder.group({
      rankDecide: [''],
      form: [''],
      numberDecide: [''],
      dateDecide: [''],
      reason: ['']
    });
    this.formDataBonus = this.formBuilder.group({
      rankDecide: [''],
      form: [''],
      numberDecide: [''],
      dateDecide: [''],
      reason: ['']
    })
  }

  onSave() {
    console.log(this.formDataDiscipline.value);
  }
}


interface  BonusDisciplineForm {
  rankDecide: string,
  form: string,
  numberDecide: string,
  dateDecide: string,
  reason: string
}
