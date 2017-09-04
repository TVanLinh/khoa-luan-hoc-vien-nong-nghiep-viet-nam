import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-salary-brief',
  templateUrl: './salary-brief.component.html',
  styleUrls: ['../form.css', './salary-brief.component.css']
})
export class SalaryBriefComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listSalaryBrief = new Collections.LinkedList<SalaryBriefForm>();

  constructor() {
    super();
    let item: SalaryBriefForm = {
      dateFrom: '20/10/2015',
      dateEnd: '20/06/2017',
      specie: 'abc',
      group: 'cdf',
      brief: 'adfgf',
      level: '1212',
      excessive: false,//vuot khung
      percentExcessive: 20,// phan tram vuot khung
      factorSalary: 20,
      numberDecide: 'QD01',
      dateSalaryUpExpected: '20/10/2017',//ngay tang luong du kien
      allowanceNow: 20,//phu cap nghe nghiep hien tai
      responsibilityNow: 20,//phu cap trach nhiem hien tai
    }
    this.listSalaryBrief.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      dateFrom: ['20/10/2015'],
      dateEnd: ['20/06/2017'],
      specie: [''],
      group: [''],
      brief: [''],
      level: [''],
      excessive: [''],//vuot khung
      percentExcessive: [],// phan tram vuot khung
      factorSalary: [20],
      numberDecide: ['QD01'],
      dateSalaryUpExpected: ['20/10/2017'],//ngay tang luong du kien
      allowanceNow: [20],//phu cap nghe nghiep hien tai
      responsibilityNow: [20],//phu cap trach nhiem hien tai
    })
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
  excessive: boolean,//vuot khung
  percentExcessive: number,// phan tram vuot khung
  factorSalary: number,
  numberDecide: string,
  dateSalaryUpExpected: string,//ngay tang luong du kien
  allowanceNow: number,//phu cap nghe nghiep hien tai
  responsibilityNow: number,//phu cap trach nhiem hien tai
}
