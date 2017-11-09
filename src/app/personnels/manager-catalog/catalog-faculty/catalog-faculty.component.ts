import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {CatalogFacultyModel} from "./catalog-faculty.model";
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-catalog-faculty',
  templateUrl: './catalog-faculty.component.html',
  styleUrls: ['./catalog-faculty.component.css', "../../form.css"]
})
export class CatalogFacultyComponent extends BaseFormComponent implements OnInit {
  @ViewChild("") modal: ModalComponent;
  positionUpdate = -1;
  list = new Collections.LinkedList<CatalogFacultyModel>();
  showParent = false;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
  }

  ngOnInit() {
  }

  changeLevel(level) {
    this.showParent = true;

  }
  onSave(formData: NgForm) {
    this.showParent =false;
    // form.reset();
    // this.modal.close();
    console.log(formData.value);
  }
}
