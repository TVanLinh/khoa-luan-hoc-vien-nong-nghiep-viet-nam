import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {SalaryModel} from "./salary.model";
import {CatalogRankModel} from "../../model/catalog-rank.model";
import {CatalogSalaryService} from "../../../shares/catalog-salary.service";
import * as Collections from "typescript-collections";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-salary-brief',
  templateUrl: './salary-brief.component.html',
  styleUrls: ['../../form.css', './salary-brief.component.css']
})
export class SalaryBriefComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @ViewChild('modalSalary') modalSalary: ModalComponent;
  formData: FormGroup;
  formMain: FormGroup;
  listSalaryBrief = new Collections.LinkedList<SalaryModel>();
  catalogRanks: CatalogRankModel[] = [];
  spieceRanks: any[] = ["A0", "A1", "A2", "A3", "B", "C"];
  specie = "";
  group = "";
  salary = 0;
  rank = "";
  levelChoise = -1;
  listGroup: CatalogRankModel[] = [];
  listRank: any[] = [];

  level = [];
  positionUpdate: SalaryModel = null;

  formNotValid = false;
  formTouch = false;
  hashData = false;

  chooseItem = null;
  groupCurrent = null;
  dateBegin = new Date();
  dateEndC = new Date();

  constructor(protected eleRef: ElementRef,
              taskService: TaskService, public  catalogRankService: CatalogSalaryService) {
    super(eleRef, taskService);

  }


  getCatalogs() {
    this.catalogRankService.getData().subscribe(data => {
      this.catalogRanks = data;
    });
  }

  spieceChange() {

    this.chooseItem = this.catalogRankService.findBySpiece(this.catalogRanks, this.specie);
    this.listGroup = this.chooseItem.group;
    this.group = "";
    this.rank = "";
    this.levelChoise = -1;

  }

  groupChange() {

    this.groupCurrent = this.catalogRankService.findByGroupName(this.chooseItem, this.group);
    if (this.groupCurrent) {
      this.listRank = this.groupCurrent.listRank;
      this.level = this.groupCurrent.level;
    }


    this.rank = "";
    this.rank = "";
    this.levelChoise = -1;
  }

  rankChange() {
  }


  levelChange() {
    this.salary = this.catalogRankService.findLevelByLevels(this.level, this.levelChoise).salary;
  }


  ngOnInit() {
    this.initForm();
    this.getCatalogs();
    this.getDataFromServer();
  }

  initForm() {
    this.formMain = this.formBuilder.group({
      now: [false]
    });

    this.formData = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateEnd: [''],
      specie: ['', Validators.required],
      group: ['', Validators.required],
      rank: ['', Validators.required],
      level: ['', Validators.required],
      numberDecide: [, Validators.required]
      // factorSalary: []
    });
  }

  addItem() {
    this.formTouch = true;
    console.log(this.formData.value);
    let valueForm = this.formData.value;

    let data: any = [valueForm.dateFrom, valueForm.specie,
      valueForm.group, valueForm.rank, valueForm.level, valueForm.numberDecide
    ];

    this.updateView("salary-brief", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    if (this.compareDate(valueForm.dateFrom, valueForm.dateEnd) >= 0) {
      return;
    }

    this.formNotValid = false;


    //---------------------------------
    let temp = valueForm;
    temp['factorSalary'] = this.salary;
    if (this.positionUpdate == null) {
      this.listSalaryBrief.add(temp);
    } else {
      this.updateList(this.listSalaryBrief, this.positionUpdate, temp);
    }
    this.positionUpdate = null;
    super.closeModal(this.modalSalary);

  }

  editItem(item) {
    this.updateValid("salary-brief");
    this.positionUpdate = item;
    console.log(JSON.stringify(item));
    this.chooseItem = this.catalogRankService.findBySpiece(this.catalogRanks, item.specie);
    console.log(" this.chooseItem  " + JSON.stringify(this.chooseItem));
    this.listGroup = this.chooseItem.group;
    this.groupCurrent = this.catalogRankService.findByGroupName(this.chooseItem, item.group);
    this.listRank = this.groupCurrent.listRank;
    this.level = this.groupCurrent.level;

    this.dateEndC = item.dateEnd;
    this.dateBegin = item.dateFrom;

    this.specie = item.specie;
    this.group = item.group;
    this.salary = item.factorSalary;
    this.rank = item.rank;
    this.levelChoise = item.level;
    this.formData.reset();
    // if (item)
    this.formData.patchValue({
      dateFrom: item.dateFrom,
      dateEnd: item.dateEnd,
      specie: item.specie,
      group: item.group,
      rank: item.rank,
      level: item.level,
      numberDecide: item.numberDecide
    });
    super.openModal(this.modalSalary);
  }

  onSave() {
    if (this.listSalaryBrief.toArray().length == 0 && !this.hashData) {
      super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
      return;
    }
    super.pushDataServer(Config.PROCESS_SALARY_URL, "salary", this.listSalaryBrief, this.user);
  }

  removeItem(index: number) {
    this.listSalaryBrief.removeElementAtIndex(index);
  }

  openModals() {
    this.formData.reset();
    this.positionUpdate = null;
    super.openModal(this.modalSalary);
    this.formTouch = false;
  }

  getDataFromServer() {
    super.getDataServer(Config.PROCESS_SALARY_URL, this.user).subscribe(data => {
      if (data && data['salary']) {
        this.listSalaryBrief = super.asList(data['salary']);
        this.hashData = true;
      }
      // console.log(JSON.stringify(data['salary']));
    }, (err) => {

    });
  }

  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }
}
