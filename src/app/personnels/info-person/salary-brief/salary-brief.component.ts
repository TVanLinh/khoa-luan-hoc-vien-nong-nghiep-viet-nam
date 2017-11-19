import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {SalaryModel} from "./salary.model";
import {CatalogRankModel} from "../../model/catalog-rank.model";
import {CatalogSalaryService} from "../../../shares/catalog-salary.service";
import  * as Collections from "typescript-collections";

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

  constructor(protected eleRef: ElementRef,
              public  catalogRankService: CatalogSalaryService
    ,
              taskService: TaskService) {
    super(eleRef, taskService);
  }


  getCatalogs() {
    this.catalogRankService.getData().subscribe(data => {
      this.catalogRanks = data;
      console.log(JSON.stringify(this.catalogRanks));
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
    this.salary = this.level[this.levelChoise].salary;
    this.levelChoise = "-1";
  }


  levelChange() {
    this.salary = this.catalogRankService.getSalaryByRankAndGroupAndSpice(this.catalogRanks, this.speice, this.group, this.levelChoise);
  }


  ngOnInit() {
    this.initForm();
    this.getCatalogs();
  }

  initForm() {
    this.formMain = this.formBuilder.group({
      now: [false]
    });

    this.formData = this.formBuilder.group({
      dateFrom: [new Date()],
      dateEnd: [new Date()],
      specie: [''],
      group: [''],
      rank: [''],
      level: [''],
      factorSalary: []
    });
  }

  addItem() {
    console.log(this.formData.value);
    this.closeModal(this.modalSalary);
    this.listSalaryBrief.add(this.formData.value);
  }

  onSave() {
    console.log(this.formData.value);
    this.listSalaryBrief.add(this.formData.value);
  }

  removeItem(index: number) {
    this.listSalaryBrief.removeElementAtIndex(index);
  }
}
