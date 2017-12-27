import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {TaskService} from "../../../shares/task.service";
import * as Collections from "typescript-collections";
import {LongtimeTrainModel} from "./longtime-train.model";
import {ShorttimeTrainModel} from "./shorttime-train.model";
import {National} from "../../model/national.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

export const LONG_TIME = 0;
export const SHORT_TIME = 1;

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['../../form.css', './train.component.css']
})
export class TrainComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @Input() editEnable = true;
  @ViewChild('trainShortTimeModal') trainShortTimeModal: ModalComponent;
  @ViewChild('trainLongTimeModal') trainLongTimeModal: ModalComponent;
  formData: FormGroup;
  formShortTime: FormGroup;
  formLongTime: FormGroup;

  longTimes = new Collections.LinkedList<LongtimeTrainModel>();
  shortTimes = new Collections.LinkedList<ShorttimeTrainModel>();
  catalogRankAcademic: any[];
  // rankAc

  positionUpdateLong: LongtimeTrainModel = null;
  positionUpdateShort: ShorttimeTrainModel = null;

  nationals: National [] = [];
  commons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  formValid = false;
  shortTimeNotValid = false;
  longTimeNotValid = false;
  formLongTouch = false;
  formShortTouch = false;
  hashData = false;

  mode = -1;

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService,
              public nationalService: NationalService,) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
    this.initNations();
  }

  initNations() {
    this.nationalService.getData().subscribe(data => {
      this.nationals = data;
    });
  }

  private initForm() {
    this.formData = this.formBuilder.group({
      generalEdu: [12, Validators.required]
    });

    this.formLongTime = this.formBuilder.group({
      yearFrom: ['', [Validators.required, Validators.min(1900)]],
      yearEnd: ['', [Validators.required, Validators.min(1900)]],
      specialized: ['', Validators.required],//chuyen nghanh
      levelLearn: [this.rankTrains[0], Validators.required],//bac hoc
      academicRank: ['Cử nhân', Validators.required],//hoc vi
      spice: [this.speciesObtain[0], Validators.required],//xep loai
      school: ['', Validators.required],
      national: ['vi', Validators.required]
    });
    this.formShortTime = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      numberMonth: ['', [Validators.required, Validators.min(1)]],
      certificate: ['', Validators.required],
      placeTrain: ['', Validators.required],
      national: ['vi', Validators.required],
      description: ['', [Validators.required, Validators.min(50)]]
    });
  }

  onSave() {
    let valueForm = this.formData.value;
    this.updateView("train-main-form", this.formData.valid);
    this.formValid = true;

    if (!valueForm.generalEdu) {
      this.updateMessge("Vui lòng chọn trình độ giáo dục phổ thông ", "warning");
      return;
    }

    if (this.longTimes.size() == 0) {
      this.updateMessge("Bạn chưa nhập quá trình đào tạo dài hạn ", "warning");
      return;
    }


    let train = {};
    train['general'] = valueForm.generalEdu;
    train['shortTime'] = this.shortTimes.toArray();
    train['longTime'] = this.longTimes.toArray();
    super.pushObjectServer(Config.TRAIN_URL, 'train', train, this.user);

  }

  resetFormData(target) {
    if (target === SHORT_TIME) {
      this.formShortTime.setValue({
        dateFrom: '',
        numberMonth: 1,
        certificate: '',
        placeTrain: '',
        national: 'vi',
        description: ''
      });
    } else if (target === LONG_TIME) {
      this.formLongTime.setValue({
        yearFrom: '',
        yearEnd: '',
        specialized: '',//chuyen nghanh
        levelLearn: this.rankTrains[0],//bac hoc
        academicRank: 'Cử nhân',//hoc v
        spice: this.speciesObtain[0],//xep loai
        school: '',
        national: 'vi'
      });
    }


  }


  addItem(mode) {
    this.formValid = false;
    let shortForm = this.formShortTime.value;
    let longForm = this.formLongTime.value;


    if (mode == SHORT_TIME) {
      this.formShortTouch = true;

      let data = [shortForm.dateFrom, shortForm.numberMonth,
        shortForm.certificate, shortForm.placeTrain, shortForm.national, shortForm.description];
      this.updateView("form-short-time", this.formShortTime.valid);

      if (!ValidService.isNotBlanks(data) || !this.formShortTime.valid) {
        this.shortTimeNotValid = true;
        this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
        return;
      }

      this.shortTimeNotValid = false;


      ///---------------------------------
      if (this.positionUpdateShort == null) {
        this.shortTimes.add(shortForm);
      } else {
        this.updateList(this.shortTimes, this.positionUpdateShort, shortForm);
      }
      this.positionUpdateShort = null;
      super.closeModal(this.trainShortTimeModal);
    } else {
      this.formLongTouch = true;

      let data = [longForm.yearFrom, longForm.yearEnd,
        longForm.specialized, longForm.levelLearn,
        longForm.academicRank, longForm.spice,
        longForm.school, longForm.national];
      this.updateView("form-long-time", this.formLongTime.valid);

      if (!ValidService.isNotBlanks(data) || !this.formLongTime.valid) {
        this.longTimeNotValid = true;
        this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
        return;
      }

      if (longForm.yearFrom > longForm.yearEnd || longForm.yearFrom < this.minYear || longForm.yearEnd < this.minYear) {
        return;
      }

      this.longTimeNotValid = false;
      //---------------------------------------------------
      if (this.positionUpdateLong == null) {
        this.longTimes.add(longForm);
      } else {
        this.updateList(this.longTimes, this.positionUpdateLong, longForm);
      }
      this.positionUpdateLong = null;
      super.closeModal(this.trainLongTimeModal);
    }
  }

  editItem(item, mode) {
    if (mode == SHORT_TIME) {
      this.positionUpdateShort = item;
      this.formShortTime.setValue({
        dateFrom: item.dateFrom,
        numberMonth: item.numberMonth,
        certificate: item.certificate,
        placeTrain: item.placeTrain,
        national: item.national,
        description: item.description
      });
      super.openModal(this.trainShortTimeModal);
    } else {
      this.positionUpdateLong = item;
      this.formLongTime.setValue({
        yearFrom: item.yearFrom,
        yearEnd: item.yearEnd,
        specialized: item.specialized,//chuyen nghanh
        levelLearn: item.levelLearn,//bac hoc
        academicRank: item.academicRank,//hoc v
        spice: item.spice,//xep loai
        school: item.school,
        national: item.national
      });
      super.openModal(this.trainLongTimeModal);
    }
  }

  removeItem(index, mode) {
    if (mode == SHORT_TIME) {
      this.shortTimes.removeElementAtIndex(index);
    } else {
      this.longTimes.removeElementAtIndex(index);
    }
  }

  openModals(mode) {
    this.resetFormData(mode);
    if (mode == SHORT_TIME) {
      super.openModal(this.trainShortTimeModal);
      this.positionUpdateShort = null;
      this.formShortTouch = false;
    } else {
      super.openModal(this.trainLongTimeModal);
      this.positionUpdateLong = null;
      this.formLongTouch = false;
    }
  }

  getDataFromServer() {
    this.getDataServer(Config.TRAIN_URL, this.user).subscribe((data) => {
      if (data && data['train']) {
        let train = data['train'];
        if (train['shortTime']) {
          this.shortTimes = super.asList(train['shortTime']);
        }
        if (train['longTime']) {
          this.longTimes = super.asList(train['longTime']);
        }
        if (typeof train['general'] === "number") {
          this.formData.setValue({
            generalEdu: train['general']
          })
        }
      }
    });

    this.getDataServer(Config.CATALOG_ACADEMIC_RANK_URL, this.user).subscribe((data: any[]) => {
      this.catalogRankAcademic = data;
    })
  }

  itemDelete = -1;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete, this.mode);
    }
    this.mode = -1;
  }

  yearValid(year1: string, year2: string) {
    return year1.trim() != '' && year2.trim() != '' && Number.parseInt(year1) <= Number.parseInt(year2);
  }

}
