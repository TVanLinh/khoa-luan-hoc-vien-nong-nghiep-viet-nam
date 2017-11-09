import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
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

  positionUpdateAcademicRank = -1;
  positionUpdateTitleTeachers = -1;

  listRankAd = new Collections.LinkedList<RankAcademicForm>();
  listTitleTeachers = new Collections.LinkedList<TitleTeacher>();

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
    let rank: RankAcademicForm = {
      rank: "Giao su",
      placeRiceive: "Hoc vien nong nghiep viet nam",
      yearReceive: 2015
    };
    let title: TitleTeacher = {
      title: "Nha gia uu tu",
      yearReceive: 2016
    };
    this.listRankAd.add(rank);
    this.listTitleTeachers.add(title);
  }

  ngOnInit() {
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

  onSave() {

  }
}

interface RankAcademicForm {
  rank: string,
  placeRiceive: string,
  yearReceive: number
}


interface TitleTeacher {
  title: string,
  yearReceive: number
}
