import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-process-work',
  templateUrl: './process-work.component.html',
  styleUrls: ['../form.css', './process-work.component.css']
})
export class ProcessWorkComponent extends BaseFormComponent implements OnInit {

  formData: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.innitForm();
  }


  innitForm() {
    this.formData = this.formBuilder.group({
      infoPersonnel: this.formBuilder.group({
        objectPersonnel: [''],
        branch: [''],//nganh
        species: [''],//loai
        isTeaching: [''],// dang giang day
        department: [''],
        dateInPayroll: [''],//ngay vao bien che
        dateInHV: [''],//ngay vao hoc vien
        yearInEducation: [''],//ngay vao nghanh giao duc
        dateInLeve1: ['']//ngay vao don vi cap 1
      }),
      inforProcess: this.formBuilder.group({
        isNotBelogtoHV: [true],
        level1: [''],
        level2: [''],
        concurrently: [false],// kiem nhiem
        dateFrom: this.formBuilder.group({
          date: [1],
          month: [1],
          year: [1999]
        }),
        isDateInPayroll: [false],
        isDateInHV: [false],
        isYearInEducation: [false],
        isDateInLeve1: [false],
        dateEnd: this.formBuilder.group({
          date: [1],
          month: [1],
          year: [1999]
        }),
        position: [''],
        job: ['']
      })
    });
  }

  onSave() {
    let valueForm = this.formData.value;
    console.log(valueForm);
  }
}
