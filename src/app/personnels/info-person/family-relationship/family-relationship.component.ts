import {Component, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
@Component({
  selector: 'app-family-relationship',
  templateUrl: './family-relationship.component.html',
  styleUrls: ['../../form.css', './family-relationship.component.css'],
})
export class FamilyRelationshipComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalFamily') modal: ModalComponent;
  formData: FormGroup;
  positionUpdate = -1;
  listRelationFamily = new Collections.LinkedList<RelationFamily>();

  constructor(public nationalService: NationalService) {
    super();
  }

  ngOnInit() {
    let a: RelationFamily = {
      relation: 'Bo',
      fullName: "La Van Tai",
      birthDay: "20/6/1976",
      job: 'Giao Vien',
      organ: 'DH Quoc Gia',
      national: 'Viet Nam'
    };
    this.listRelationFamily.add(a);
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      relation: [''],
      fullName: [''],
      birthDay: [''],
      job: [''],
      organ: [''],
      national: ['not']
    })
  }

  onSave() {
    let valueForm = this.formData.value;
    console.log(valueForm);
  }

  addItem() {
    let valueForm = this.formData.value;
    if (this.positionUpdate == -1) {
      this.listRelationFamily.add(valueForm);
    } else {
      this.listRelationFamily.removeElementAtIndex(this.positionUpdate);
      this.listRelationFamily.add(valueForm, this.positionUpdate);
    }

    this.resetForm();
    this.closeModal(this.modal);
  }

  resetForm() {
    this.formData.patchValue({
      relation: [''],
      fullName: [''],
      birthDay: [''],
      job: [''],
      organ: [''],
      national: ['not']
    });
  }

  removeItem(index: number) {
    this.listRelationFamily.removeElementAtIndex(index);
  }

  editItem(index: number) {
    this.positionUpdate = index;

    let itemEdit = this.listRelationFamily.elementAtIndex(index);
    this.formData.setValue({
      relation: itemEdit.relation,
      fullName: itemEdit.fullName,
      birthDay: itemEdit.birthDay,
      job: itemEdit.job,
      organ: itemEdit.organ,
      national: itemEdit.national
    });

    this.openModal(this.modal);
  }


}

export interface  RelationFamily {
  relation: string,
  fullName: string,
  birthDay: string,
  job: string,
  organ: string,
  national: string
}