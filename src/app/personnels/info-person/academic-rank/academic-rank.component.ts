import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {AcademicRankModel} from "./academic-rank.model";
import {TeacherTitleModel} from "./teacher-title.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

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

  formAcadNotValid = false;
  formTitleNotValid = false;

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
      rank: ['', Validators.required],
      placeReceive: ['', Validators.required],
      yearReceive: [2016, [Validators.required, Validators.min(1900)]]
    });
    this.formTitleTeachers = this.formBuilder.group({
      title: ['', Validators.required],
      yearReceive: [2016, [Validators.required, Validators.min(1900)]]
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

    let data = [valueForm.rank, valueForm.placeReceive, valueForm.yearReceive];

    this.updateView("form-academic", this.formAcademicRank.valid);

    if (!ValidService.isNotBlanks(data) || !this.formAcademicRank.valid) {
      this.formAcadNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }
    this.formAcadNotValid = false;

    //----------------------------------------
    if (this.positionUpdateAca == null) {
      this.listRankAd.add(valueForm);
    } else {
      this.updateList(this.listRankAd, this.positionUpdateAca, valueForm);
    }

    super.closeModal(this.academicRank);
  }

  addTeacher() {
    let valueForm = this.formTitleTeachers.value;


    let data = [valueForm.title, valueForm.yearReceive];

    this.updateView("form-title", this.formTitleTeachers.valid);

    if (!ValidService.isNotBlanks(data) || !this.formTitleTeachers.valid) {
      this.formTitleNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }
    this.formTitleNotValid = false;

    //-------------------------------------------
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


    if (type == 0) {
      this.updateValid("form-academic");
      this.positionUpdateAca = item;
      this.formAcademicRank.setValue({
        rank: item.rank,
        placeReceive: item.placeReceive,
        yearReceive: item.yearReceive
      });
      super.openModal(this.academicRank);
    } else {
      this.updateValid("form-title");
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
