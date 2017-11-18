import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
@Component({
  selector: 'app-salary-brief',
  templateUrl: './salary-brief.component.html',
  styleUrls: ['../../form.css', './salary-brief.component.css']
})
export class SalaryBriefComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalSalary') modalSalary: ModalComponent;
  formData: FormGroup;
  formMain: FormGroup;
  listSalaryBrief = new Collections.LinkedList<SalaryBriefForm>();

  constructor(protected eleRef: ElementRef,taskService: TaskService) {
    super(eleRef,taskService);
    let item: SalaryBriefForm = {
      dateFrom: '20/10/2015',
      dateEnd: '20/06/2017',
      specie: 'abc',
      group: 'cdf',
      brief: 'adfgf',
      level: '1212',
      factorSalary: 20,
      numberDecide: 'QD01',
    };
    this.listSalaryBrief.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formMain = this.formBuilder.group({
      now: [false]
    });

    this.formData = this.formBuilder.group({
      dateFrom: ['20/10/2015'],
      dateEnd: ['20/06/2017'],
      specie: [''],
      group: [''],
      brief: [''],
      level: [''],
      percentExcessive: [],// phan tram vuot khung
      factorSalary: [20],
      numberDecide: ['QD01'],
      dateSalaryUpExpected: ['20/10/2017'],//ngay tang luong du kien
      allowanceNow: [20],//phu cap nghe nghiep hien tai
      responsibilityNow: [20],//phu cap trach nhiem hien tai
    });
  }

  addItem() {
    console.log(this.formData.value);
    this.closeModal(this.modalSalary);
    this.listSalaryBrief.add(this.formData.value);
  }

  onSave() {
    console.log(this.formData.value);
    this.listSalaryBrief.add(this.formData.value);
  }

  removeItem(index: number) {
    this.listSalaryBrief.removeElementAtIndex(index);
  }
}

interface  SalaryBriefForm {
  dateFrom: string,
  dateEnd: string,
  specie: string,
  group: string,
  brief: string,
  level: string,
  factorSalary: number,
  numberDecide: string,
}
