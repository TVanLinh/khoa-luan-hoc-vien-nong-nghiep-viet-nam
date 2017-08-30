import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['../form.css', './train.component.css']
})
export class TrainComponent extends BaseFormComponent implements OnInit {

  formData: FormGroup;
  itemLong: LongTimeTrainForm = {
    yearFrom: '2015',
    yearEnd: '2017',
    specialized: 'CNTT',//chuyen nghanh
    levelLearn: 'DH',//bac hoc
    academicRank: 'Cu nhan',//hoc vi
    spice: 'Kha',//xep loai
    school: 'HVNNVN',
    national: 'VN'
  };
  itemShort: ShortTimeTrainForm = {
    dateFrom: '10/2017',
    numberMonth: 6,
    certificate: 'Tin Hoc',
    placeTrain: 'HNNNVN',
    national: 'VN',
    description: 'Cu nhan tin hoc'
  };

  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private  initForm() {
    this.formData = this.formBuilder.group({
      generalEdu: [''],
      longTime: this.formBuilder.group({
        yearFrom: [''],
        yearEnd: [''],
        specialized: [''],//chuyen nghanh
        levelLearn: [''],//bac hoc
        academicRank: [''],//hoc vi
        spice: [''],//xep loai
        school: [''],
        national: ['']
      }),
      shortTime: this.formBuilder.group({
        dateFrom: [''],
        numberMonth: [''],
        certificate: [''],
        placeTrain: [''],
        national: [''],
        description: ['']
      })
    });
  }

  onSave() {
    console.log(this.formData.value);
  }

  resetFormData(target: string) {
    if (target === 'short-time') {
      this.formData.patchValue({
        shortTime: {
          dateFrom: '',
          numberMonth: 1,
          certificate: '',
          placeTrain: '',
          national: '',
          description: ''
        }
      });
    } else if (target === 'long-time') {
      this.formData.patchValue({
        longTime: {
          yearFrom: '',
          yearEnd: '',
          specialized: '',//chuyen nghanh
          levelLearn: '',//bac hoc
          academicRank: '',//hoc vi
          spice: '',//xep loai
          school: '',
          national: ''
        }
      })
    }
  }
}

interface  ShortTimeTrainForm {
  dateFrom: string,
  numberMonth: number,
  certificate: string,
  placeTrain: string,
  national: string,
  description: string
}

interface  LongTimeTrainForm {
  yearFrom: string,
  yearEnd: string,
  specialized: string,//chuyen nghanh
  levelLearn: string,//bac hoc
  academicRank: string,//hoc vi
  spice: string,//xep loai
  school: string,
  national: string
}
