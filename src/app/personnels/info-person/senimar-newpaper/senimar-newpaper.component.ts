import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
declare const jQuery: any;
const SENIMAR: string = "SENIMAR";
const NEWSPAPER: string = "NEWSPAPER";

@Component({
  selector: 'app-senimar-newpaper',
  templateUrl: './senimar-newpaper.component.html',
  styleUrls: ['../../form.css', './senimar-newpaper.component.css']
})

export class SenimarNewpaperComponent extends BaseFormComponent implements OnInit {
  @ViewChild('seminaModal') seminaModal: ModalComponent;
  @ViewChild('newspaperModal') newspaperModal: ModalComponent;


  formSemina: FormGroup;
  formNewspaper: FormGroup;
  positionSeminaUpdate = -1;
  positionNewspaperUpdate = -1;
  listSenimar = new Collections.LinkedList<SenimarForm>();
  listNewsPaper = new Collections.LinkedList<NewspaperForm>();

  openSenimar = true;
  openNewspaper = false;

  constructor(private eleRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.formSemina = this.formBuilder.group({
      name: ['Bao cao song va lam viec theo tam guong chu tich HCM'],
      nameConvention: ['Hoi nghi Vecsay'],
      pagePost: [234],
      year: [2016],
      numberAuthor: [4],
      authors: ['ABC,CDHDD'],
      location: ['']
    });
    this.formNewspaper = this.formBuilder.group({
      name: ["Ban yeu sach cua nhan dan an nam"],
      nameMagazine: ["Nhun nguoi cung kho"],
      numberMagazine: [4],
      pagePost: 235,
      year: 2017,
      numberAuthor: 5,
      authors: ['kdkfdk fdofdkfd kfdkfd'],
      location: ['']
    });
  }

  addItem(target: string) {
    let valueFormSemina = this.formSemina.value;
    let valueFormNewspaper = this.formNewspaper.value;

    switch (target) {
      case SENIMAR:
        if (this.positionSeminaUpdate == -1) {
          this.listSenimar.add(valueFormSemina);
        } else {
          this.listSenimar.removeElementAtIndex(this.positionSeminaUpdate);
          this.listSenimar.add(valueFormSemina);
        }

        this.closeModal(this.seminaModal);
        break;
      case NEWSPAPER:
        if (this.positionNewspaperUpdate == -1) {
          this.listNewsPaper.add(valueFormNewspaper);
        } else {
          this.listNewsPaper.removeElementAtIndex(this.positionNewspaperUpdate);
          this.listNewsPaper.add(valueFormNewspaper);
        }

        this.closeModal(this.newspaperModal);
        break;
    }
  }

  editItem(target, index: number) {

  }

  remove(target: string, index: number) {

  }
}

interface  SenimarForm {
  name: string,
  nameConvention: string,
  pagePost: number,
  year: number,
  numberAuthor: number,
  authors: string,
  location: string
}

interface NewspaperForm {
  name: string,
  nameMagazine: string,
  numberMagazine: string,
  pagePost: number,
  year: number,
  numberAuthor: number,
  authors: string,
  location: string
}
