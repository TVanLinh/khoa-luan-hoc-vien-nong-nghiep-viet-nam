import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {TaskService} from "../../../shares/task.service";
import * as Collections from "typescript-collections";
import {LongtimeTrainModel} from "./longtime-train.model";
import {ShorttimeTrainModel} from "./shorttime-train.model";
import {National} from "../../model/national.model";
import {Config} from "../../../shares/config";

export const LONG_TIME = 0;
export const SHORT_TIME = 1;

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

  longTimes = new Collections.LinkedList<LongtimeTrainModel>();
  shortTimes = new Collections.LinkedList<ShorttimeTrainModel>();
  catalogRankAcademic: any[];
  // rankAc

  positionUpdateLong: LongtimeTrainModel = null;
  positionUpdateShort: ShorttimeTrainModel = null;

  nationals: National [] = [];
  commons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
      generalEdu: [12]
    });

    this.formLongTime = this.formBuilder.group({
      yearFrom: [''],
      yearEnd: [''],
      specialized: [''],//chuyen nghanh
      levelLearn: [this.rankTrains[0]],//bac hoc
      academicRank: ['Cử nhân'],//hoc vi
      spice: [this.speciesObtain[0]],//xep loai
      school: [''],
      national: ['vi']
    });
    this.formShortTime = this.formBuilder.group({
      dateFrom: [''],
      numberMonth: [''],
      certificate: [''],
      placeTrain: [''],
      national: ['vi'],
      description: ['']
    });
  }

  onSave() {
    let valueForm = this.formData.value;

    let train = {};
    train['general'] = valueForm.generalEdu;
    train['shortTime'] = this.shortTimes.toArray();
    train['longTime'] = this.longTimes.toArray();
    super.pushObjectServer(Config.TRAIN_URL, 'train', train);

  }

  resetFormData(target) {
    if (target === SHORT_TIME) {
      this.formShortTime.setValue({
        dateFrom: new Date(),
        numberMonth: 1,
        certificate: '',
        placeTrain: '',
        national: 'vi',
        description: ''
      });
    } else if (target === LONG_TIME) {
      this.formLongTime.setValue({
        yearFrom: new Date(),
        yearEnd: new Date(),
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
    let shortForm = this.formShortTime.value;
    let longForm = this.formLongTime.value;

    console.log(shortForm);
    console.log(longForm);

    if (mode == SHORT_TIME) {
      if (this.positionUpdateShort == null) {
        this.shortTimes.add(shortForm);
      } else {
        this.updateList(this.shortTimes, this.positionUpdateShort, shortForm);
      }
      this.positionUpdateShort = null;
      super.closeModal(this.trainShortTimeModal);
    } else {
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
    } else {
      super.openModal(this.trainLongTimeModal);
      this.positionUpdateLong = null;
    }
  }

  getDataFromServer() {
    this.getDataServer(Config.TRAIN_URL).subscribe((data) => {
      let train = data['train'];
      if (train != null) {
        this.shortTimes = super.asList(train['shortTime']);
        this.longTimes = super.asList(train['longTime']);
        if (typeof train['general'] === "number") {
          this.formData.setValue({
            generalEdu: train['general']
          })
        }
      }
    });

    this.getDataServer(Config.CATALOG_ACADEMIC_RANK_URL).subscribe((data: any[]) => {
      this.catalogRankAcademic = data;
    })
  }
}
