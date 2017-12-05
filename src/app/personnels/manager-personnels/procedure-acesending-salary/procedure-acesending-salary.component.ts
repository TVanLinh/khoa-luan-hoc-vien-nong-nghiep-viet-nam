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
  speice = "";
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

  constructor(protected eleRef: ElementRef,
              public  catalogRankService: CatalogSalaryService
    ,
              taskService: TaskService) {
    super(eleRef, taskService);

  }

  ngOnInit() {
    this.initForm();
    this.getCatalogs();
    // this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      dateDecide: ['', Validators.required],
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
    console.log(this.speice);
    this.listGroup = this.catalogRankService.getGroupBySpieceName(this.catalogRanks, this.speice);
    if (this.listGroup[0]) {
      this.group = this.listGroup[0].group.name.toString();
      this.groupChange();
    }

    this.group = "";
    this.rank = "";
    this.levelChoise = "";

  }

  groupChange() {
    let a = this.catalogRankService.getRankByGroupNameAndSpiece(this.catalogRanks, this.speice, this.group);
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
    this.salary = this.catalogRankService.getSalaryByRankAndGroupAndSpice(this.catalogRanks, this.speice, this.group, this.levelChoise);
  }

  onChoiseHandler($event) {
    this.formTouch = false;
    this.user = $event;
    // this.formBindJob.patchValue({
    //   fullName: data.fullname,
    //   personnelCode: data.username
    // });
    this.speice = '';
    this.levelChoise = '';
    this.rank = '';
    super.openModal(this.modalSalary);
  }

  onSave() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    let valid = [valueForm.dateDecide,
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

    valueForm['user'] = this.user;
    valueForm['speice'] = this.speice;
    valueForm['level'] = this.levelChoise;
    valueForm['factor'] = this.salary;

    this.taskService.post(Config.SALART_HISTORY_URL, {data: valueForm}).subscribe(data => {
      super.updateMessge("Thành công ", 'success');
      setTimeout(() => {
        super.closeModal(this.modalSalary);
      }, 1000);
    }, err => {

    });

  }

}
