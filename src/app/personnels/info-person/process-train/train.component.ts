import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['../../form.css', './train.component.css']
})
export class TrainComponent extends BaseFormComponent implements OnInit {
  @ViewChild('trainShortTimeModal') trainShortTimeModal: ModalComponent;
  @ViewChild('trainLongTimeModal') trainLongTimeModal: ModalComponent;
  formData: FormGroup;
  formShortTime: FormGroup;
  formLongTime: FormGroup;

  positionUpdateLongTime = -1;
  positionUpdateShortTime = -1;

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

  constructor(public nationalService: NationalService,protected eleRef: ElementRef) {
    super(eleRef);
  }

  ngOnInit() {
    this.initForm();
  }

  private  initForm() {
    this.formData = this.formBuilder.group({
      generalEdu: ['']
    });

    this.formLongTime = this.formBuilder.group({
      yearFrom: [''],
      yearEnd: [''],
      specialized: [''],//chuyen nghanh
      levelLearn: [''],//bac hoc
      academicRank: [''],//hoc vi
      spice: [''],//xep loai
      school: [''],
      national: ['']
    });
    this.formShortTime = this.formBuilder.group({
      dateFrom: [''],
      numberMonth: [''],
      certificate: [''],
      placeTrain: [''],
      national: [''],
      description: ['']
    });
  }

  onSave() {
    console.log(this.formData.value);
  }

  resetFormData(target: string) {
    if (target === 'short-time') {
      this.formShortTime.patchValue({
        shortTime: {
          dateFrom: '',
          numberMonth: 1,
          certificate: '',
          placeTrain: '',
          national: 'not',
          description: ''
        }
      });
    } else if (target === 'long-time') {
      this.formLongTime.patchValue({
        longTime: {
          yearFrom: '',
          yearEnd: '',
          specialized: '',//chuyen nghanh
          levelLearn: '',//bac hoc
          academicRank: '',//hoc vi
          spice: '',//xep loai
          school: '',
          national: 'not'
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
