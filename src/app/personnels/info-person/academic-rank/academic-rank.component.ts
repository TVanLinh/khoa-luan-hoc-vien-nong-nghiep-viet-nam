import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {AcademicRankModel} from "./academic-rank.model";
import {TeacherTitleModel} from "./teacher-title.model";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-academic-rank',
  templateUrl: './academic-rank.component.html',
  styleUrls: ['../../form.css', './academic-rank.component.css']
})
export class AcademicRankComponent extends BaseFormComponent implements OnInit {
  @ViewChild('academicRank') academicRank: ModalComponent;
  @ViewChild('titleTeachers') titleTeachers: ModalComponent;


  formAcademicRank: FormGroup;
  formTitleTeachers: FormGroup;
  mode = -1;

  positionUpdateAca: AcademicRankModel = null;
  positionUpdateTeacher: TeacherTitleModel = null;

  listRankAd = new Collections.LinkedList<AcademicRankModel>();
  listTitleTeachers = new Collections.LinkedList<TeacherTitleModel>();
  catalogAcademicRank: { name: string }[];

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
    let rank: AcademicRankModel = {
      rank: "",
      placeReceive: "Hoc vien nong nghiep viet nam",
      yearReceive: 2015
    };
    let title: TeacherTitleModel = {
      title: "Nhà giáo nhân dân",
      yearReceive: 2016
    };
  }

  ngOnInit() {
    this.getDataFromServer();
    this.initForm();
  }

  initForm() {
    this.formAcademicRank = this.formBuilder.group({
      rank: [''],
      placeReceive: [''],
      yearReceive: [2016]
    });
    this.formTitleTeachers = this.formBuilder.group({
      title: [''],
      yearReceive: [2016]
    });
  }

  onSave(type) {
    this.mode = type;
    if (type == 0) {
      super.pushDataServer(Config.ACADEMIC_RANK_URL, "academic_rank", this.listRankAd);
    } else {
      super.pushDataServer(Config.TEACHER_TITLE_URL, "teacher_title", this.listTitleTeachers);
    }
  }

  addAcademic() {
    let valueForm = this.formAcademicRank.value;
    if (this.positionUpdateAca == null) {
      this.listRankAd.add(valueForm);
    } else {
      this.updateList(this.listRankAd, this.positionUpdateAca, valueForm);
    }

    super.closeModal(this.academicRank);
  }

  addTeacher() {
    let valueForm = this.formTitleTeachers.value;
    if (this.positionUpdateTeacher == null) {
      this.listTitleTeachers.add(valueForm);
    } else {
      this.updateList(this.listTitleTeachers, this.positionUpdateTeacher, valueForm);
    }
    super.closeModal(this.titleTeachers);
  }

  openModalByType(academicRank, type) {
    this.openModal(academicRank);
    if (type == 0) {
      this.positionUpdateAca = null;
      this.formAcademicRank.reset();
    } else {
      this.positionUpdateTeacher = null;
      this.formTitleTeachers.reset();
    }
  }

  editItem(item, type) {
    console.log("item " + JSON.stringify(item));
    if (type == 0) {
      this.positionUpdateAca = item;
      this.formAcademicRank.setValue({
        rank: item.rank,
        placeReceive: item.placeReceive,
        yearReceive: item.yearReceive
      });
      super.openModal(this.academicRank);
    } else {
      this.positionUpdateTeacher = item;
      this.formTitleTeachers.setValue({
        title: item.title,
        yearReceive: item.yearReceive
      });
      super.openModal(this.titleTeachers);
    }
  }

  removeItem(i, type) {
    if (type == 0) {
      this.listRankAd.removeElementAtIndex(i);
    } else {
      this.listTitleTeachers.removeElementAtIndex(i);
    }
  }

  getDataFromServer() {
    this.getDataServer(Config.ACADEMIC_RANK_URL).subscribe((data: any[]) => {
      this.listRankAd = super.asList(data['academic_rank']);
    }, (err) => {

    });
    this.getDataServer(Config.TEACHER_TITLE_URL).subscribe((data: any[]) => {
      this.listTitleTeachers = super.asList(data['teacher_title']);
    }, (err) => {

    });

    this.getDataServer(Config.CATALOG_ACADEMIC_RANK_URL).subscribe((data: any[]) => {
      this.catalogAcademicRank = data;
    })
  }


}
