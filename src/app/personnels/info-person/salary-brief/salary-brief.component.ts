import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
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
  @ViewChild('modalSalary') modalSalary: ModalComponent;
  formData: FormGroup;
  formMain: FormGroup;
  listSalaryBrief = new Collections.LinkedList<SalaryModel>();
  catalogRanks: CatalogRankModel[] = [];
  spieceRanks: any[] = ["A0", "A1", "A2", "A3", "B", "C"];
  speice = "";
  group = "";
  salary = 0;
  listGroup: CatalogRankModel[] = [];
  listRank: any[] = [];
  levelChoise = "";
  level = [];
  rank = "";
  positionUpdate: SalaryModel = null;

  formNotValid = false;

  constructor(protected eleRef: ElementRef,
              public  catalogRankService: CatalogSalaryService
    ,
              taskService: TaskService) {
    super(eleRef, taskService);

  }


  getCatalogs() {
    this.catalogRankService.getData().subscribe(data => {
      this.catalogRanks = data;
      // console.log(JSON.stringify(this.catalogRanks));
    });
  }

  spieceChange() {
    console.log(this.speice);
    this.listGroup = this.catalogRankService.getGroupBySpieceName(this.catalogRanks, this.speice);
    if (this.listGroup[0]) {
      this.group = this.listGroup[0].group.name.toString();
      this.groupChange();
    }

  }

  groupChange() {
    let a = this.catalogRankService.getRankByGroupNameAndSpiece(this.catalogRanks, this.speice, this.group);
    if (a != null) {
      this.listRank = a['group']['listRank'];
      this.level = a['group']['level'];
    }
    return a;
  }

  rankChange() {
    this.levelChoise = "1";
    this.levelChange();
    //this.salary = this.level[this.levelChoise].salary;
    this.levelChoise = "-1";
  }


  levelChange() {
    this.salary = this.catalogRankService.getSalaryByRankAndGroupAndSpice(this.catalogRanks, this.speice, this.group, this.levelChoise);
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
      dateEnd: ['', Validators.required],
      specie: ['', Validators.required],
      group: ['', Validators.required],
      rank: ['', Validators.required],
      level: ['', Validators.required],
      numberDecide: [, Validators.required]
      // factorSalary: []
    });
  }

  addItem() {
    console.log(this.formData.value);
    let valueForm = this.formData.value;

    let data: any = [valueForm.dateFrom, valueForm.dateEnd, valueForm.specie,
      valueForm.group, valueForm.rank, valueForm.level, valueForm.numberDecide
    ];

    this.updateView("salary-brief", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
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

    this.speice = item.speice;
    this.group = item.group;
    this.salary = item.factorSalary;
    this.rank = item.rank;
    this.levelChoise = item.level;
    this.formData.setValue({
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
    super.pushDataServer(Config.PROCESS_SALARY_URL, "salary", this.listSalaryBrief);
  }

  removeItem(index: number) {
    this.listSalaryBrief.removeElementAtIndex(index);
  }

  openModals() {
    this.formData.reset();
    this.positionUpdate = null;
    super.openModal(this.modalSalary);
  }

  getDataFromServer() {
    super.getDataServer(Config.PROCESS_SALARY_URL).subscribe(data => {
      this.listSalaryBrief = super.asList(data['salary']);
      // console.log(JSON.stringify(data['salary']));
    }, (err) => {

    });
  }
}
