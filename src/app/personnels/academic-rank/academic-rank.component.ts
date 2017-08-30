import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-academic-rank',
  templateUrl: './academic-rank.component.html',
  styleUrls: ['../form.css', './academic-rank.component.css']
})
export class AcademicRankComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;

  listRankAd = new Collections.LinkedList<RankAcademicForm>();
  listTitleTeachers = new Collections.LinkedList<TitleTeacher>();

  constructor() {
    super();
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
    this.formData = this.formBuilder.group({
      academicRank: this.formBuilder.group({
        rank: [''],
        placeReceive: [''],
        yearReceive: [2016]
      }),
      titleTeachers: this.formBuilder.group({
        title: [''],
        yearReceive: [2016]
      })
    })
  }

  onSave() {
    console.log(this.formData.value);
  }
  resetFormData(target:string){
    if(target==='academic') {
      this.formData.patchValue({
        academicRank:{
          rank: [''],
          placeReceive: [''],
          yearReceive: []
        }
      })
    }
    else if(target==='title'){
      this.formData.patchValue({
        titleTeachers:{
          title: [''],
          yearReceive: []
        }
      })
    }
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
