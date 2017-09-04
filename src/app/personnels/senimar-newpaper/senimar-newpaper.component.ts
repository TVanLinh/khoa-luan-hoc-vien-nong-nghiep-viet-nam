import {Component, ElementRef, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../base-form.component";
import * as Collections from "typescript-collections";
declare const jQuery: any;
const SENIMAR: string = "SENIMAR";
const NEWSPAPER: string = "NEWSPAPER";

@Component({
  selector: 'app-senimar-newpaper',
  templateUrl: './senimar-newpaper.component.html',
  styleUrls: ['../form.css', './senimar-newpaper.component.css']
})

export class SenimarNewpaperComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
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
    this.formData = this.formBuilder.group({
      senimar: this.formBuilder.group({
        name: ['Bao cao song va lam viec theo tam guong chu tich HCM'],
        nameYearBook: ['2015'],
        nameConvention: ['Hoi nghi Vecsay'],
        pagePost: [234],
        year: [2016],
        numberAuthor: [4],
        authors: ['ABC,CDHDD'],
        location: ['']
      }),
      newspaper: this.formBuilder.group({
        name: ["Ban yeu sach cua nhan dan an nam"],
        nameMagazine: ["Nhun nguoi cung kho"],
        numberMagazine: [4],
        pagePost: 235,
        year: 2017,
        numberAuthor: 5,
        authors: ['kdkfdk fdofdkfd kfdkfd'],
        location: ['']
      })
    });
  }

  addItem(target: string) {
    let valueForm = this.formData.value;
    switch (target) {
      case SENIMAR:
        if (this.openSenimar == true) {
          this.listSenimar.add(valueForm.senimar);
        } else {
          this.openSenimar = true;
          this.openNewspaper = false;
        }


        break;
      case NEWSPAPER:
        if (this.openNewspaper == true) {
          this.listNewsPaper.add(valueForm.newspaper);
        } else {
          this.openNewspaper = true;
          this.openSenimar = false;
        }
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
  nameYearBook: string,
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
