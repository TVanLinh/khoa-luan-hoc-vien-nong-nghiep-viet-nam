import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from "../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
@Component({
  selector: 'app-foreign',
  templateUrl: './foreign.component.html',
  styleUrls: ['../form.css', './foreign.component.css']
})
export class ForeignComponent extends BaseFormComponent implements OnInit {
  formData: FormGroup;
  listForeignForm = new Collections.LinkedList<ForeignForm>();
  positionEdit = -1;

  constructor() {
    super();
    let item: ForeignForm = {
      dateFrom: '20/10/2015',
      dateEnd: '20/10/2016',
      national: 'Duc',
      organInvite: 'cn',
      costGoBack: 'hv',
      product: 'bai bao',
      nameOrganInvite: 'CNLB duc',
      purpose: 'Lao dong',
      costLiving: 'dt'
    };
    this.listForeignForm.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      dateFrom: ['20/10/2015'],
      dateEnd: ['20/10/2016'],
      national: [''],
      organInvite: ['cn'],
      costGoBack: ['hv'],
      product: ['bai bao'],
      purpose: ['Lao dong'],
      nameOrganInvite: ['CNLB duc'],
      costLiving: ['dt']
    });
  }

  onSave() {
    if (this.positionEdit > -1) {
      this.listForeignForm.removeElementAtIndex(this.positionEdit);
      this.listForeignForm.add(this.formData.value, this.positionEdit);
    } else {
      this.listForeignForm.add(this.formData.value);
    }
    this.positionEdit = -1;
  }

  removeItem(index: number) {
    this.listForeignForm.removeElementAtIndex(index);
  }

  editItem(index: number) {
    let edit = this.listForeignForm.elementAtIndex(index);
    this.formData.setValue({
      dateFrom: edit.dateFrom,
      dateEnd: edit.dateEnd,
      national: edit.national,
      organInvite: edit.organInvite,
      costGoBack: edit.costGoBack,
      product: edit.product,
      purpose: edit.purpose,
      nameOrganInvite: edit.nameOrganInvite,
      costLiving: edit.costLiving
    });
    this.positionEdit = index;
  }

}

interface  ForeignForm {
  dateFrom: string,
  dateEnd: string,
  national: string,
  organInvite: string,
  costGoBack: string,
  product: string,
  purpose: string,
  nameOrganInvite: string,
  costLiving: string
}
