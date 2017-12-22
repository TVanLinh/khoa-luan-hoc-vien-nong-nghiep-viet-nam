import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogRankModel} from "../../model/catalog-rank.model";
import {SalaryModel} from "../../info-person/salary-brief/salary.model";
import {CatalogSalaryService} from "../../../shares/catalog-salary.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {FormGroup, Validators} from "@angular/forms";
import {ValidService} from "../../../shares/valid.service";
import {Config} from "../../../shares/config";
import * as Collections from "typescript-collections";

@Component({
  selector: 'app-procedure-acesending-salary',
  templateUrl: './procedure-acesending-salary.component.html',
  styleUrls: ['../../form.css', './procedure-acesending-salary.component.css']
})
export class ProcedureAcesendingSalaryComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalSalary') modalSalary: ModalComponent;
  formData: FormGroup;
  catalogRanks: CatalogRankModel[] = [];
  spieceRanks: any[] = ["A0", "A1", "A2", "A3", "B", "C"];
  specie = "";
  group = "";
  salary = 0;
  rank = "";
  levelChoise = "";
  listGroup: CatalogRankModel[] = [];
  listRank: any[] = [];

  level = [];
  positionUpdate: SalaryModel = null;

  formTouch = false;
  user: any;

  listSalaryBrief = new Collections.LinkedList<SalaryModel>();

  constructor(protected eleRef: ElementRef,
              public  catalogRankService: CatalogSalaryService
    ,
              taskService: TaskService) {
    super(eleRef, taskService);

  }

  ngOnInit() {
    this.initForm();
    this.getCatalogs();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      specie: ['', Validators.required],
      group: ['', Validators.required],
      rank: ['', Validators.required],
      level: ['', Validators.required],
      numberDecide: [, Validators.required],
      contentDecide: ['', Validators.required],
      // factorSalary: []
    });
  }

  getCatalogs() {
    this.catalogRankService.getData().subscribe(data => {
      this.catalogRanks = data;
      // console.log(JSON.stringify(this.catalogRanks));
    });
  }

  spieceChange() {
    console.log(this.specie);
    this.listGroup = this.catalogRankService.getGroupBySpieceName(this.catalogRanks, this.specie);
    if (this.listGroup[0]) {
      this.group = this.listGroup[0].group.name.toString();
      this.groupChange();
    }

    this.group = "";
    this.rank = "";
    this.levelChoise = "";

  }

  groupChange() {
    let a = this.catalogRankService.getRankByGroupNameAndSpiece(this.catalogRanks, this.specie, this.group);
    if (a != null) {
      this.listRank = a['group']['listRank'];
      this.level = a['group']['level'];
    }
    this.rank = "";
    this.rank = "";
    this.levelChoise = "";
    return a;
  }

  rankChange() {
    this.levelChoise = "";
    this.levelChange();
    this.levelChoise = "";
  }


  levelChange() {
    this.salary = this.catalogRankService.getSalaryByRankAndGroupAndSpice(this.catalogRanks, this.specie, this.group, this.levelChoise);
  }

  onChoiseHandler($event) {
    this.formTouch = false;
    this.user = $event;
    this.formData.reset();
    this.specie = '';
    this.levelChoise = '';
    this.rank = '';
    this.positionUpdate = null;
    this.getDataFromServer();
    super.openModal(this.modalSalary);
  }

  onSave() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    let valid = [valueForm.dateFrom,
      valueForm.specie,
      valueForm.group,
      valueForm.rank,
      this.levelChoise,
      valueForm.numberDecide,
      valueForm.contentDecide,
    ];
    if (!ValidService.isNotBlanks(valid) || !this.formData.valid) {
      return;
    }

    // valueForm['user'] = this.user;
    valueForm['specie'] = this.specie;
    valueForm['level'] = this.levelChoise;
    valueForm['factorSalary'] = this.salary;

    let body = {
      "staffCode": this.user['username']
    };


    let temp = new Collections.LinkedList();

    for (let i of this.listSalaryBrief.toArray()) {
      temp.add(i);
    }
    if (this.positionUpdate) {
      temp = super.updateList(temp, this.positionUpdate, valueForm);
    } else {
      temp.add(valueForm);
    }

    body['salary'] = temp.toArray();

    this.taskService.post(Config.PROCESS_SALARY_URL, {data: body}).subscribe((resp) => {
      super.updateMessge("Thành công ", 'success');
      if (this.positionUpdate) {
        super.updateList(this.listSalaryBrief, this.positionUpdate, valueForm);
      } else {
        this.listSalaryBrief.add(valueForm);
      }
      this.formTouch = false;
      this.formData.reset();
      this.positionUpdate = null;
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
    // this.pushDataServer(Config.PROCESS_SALARY_URL, 'salary', this.listSalaryBrief);
  }

  getDataFromServer() {
    super.getDataServer2(Config.PROCESS_SALARY_URL, this.user.username).subscribe(data => {
      if (data && data['salary']) {
        this.listSalaryBrief = super.asList(data['salary']);
      }
    }, (err) => {

    });
  }

  editItem(item) {
    this.positionUpdate = item;

    this.specie = item.specie;
    this.group = item['group'];
    this.salary = item.factorSalary;
    this.rank = item.rank;
    this.levelChoise = item.level;
    this.formData.reset();

    this.listGroup = this.catalogRankService.getGroupBySpieceName(this.catalogRanks, item.specie);

    let a = this.catalogRankService.getRankByGroupNameAndSpiece(this.catalogRanks, item.specie, item['group']);

    if (a != null) {
      this.listRank = a['group']['listRank'];
      this.level = a['group']['level'];
    }


    this.formData.reset();
    this.formTouch = false;

    if (item.dateEnd) {
      this.formData.patchValue({});
    }
    this.formData.patchValue({
      dateFrom: item.dateFrom,
      dateEnd: item.dateEnd ? item.dateEnd : '',
      specie: item.specie,
      group: item.group,
      rank: item.rank,
      level: item.level,
      numberDecide: item.numberDecide,
      contentDecide: item.contentDecide ? item.contentDecide : '',
    });
    super.openModal(this.modalSalary);
  }

  removeItem(item) {
    let body = {
      "staffCode": this.user['username']
    };
    this.listSalaryBrief.remove(item);
    body['salary'] = this.listSalaryBrief.toArray();
    this.taskService.post(Config.PROCESS_SALARY_URL, {data: body}).subscribe((resp) => {
      super.updateMessge("Xóa thành công ", 'success');
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  itemDelete = null;
  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }
}
