import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";
@Component({
  selector: 'app-foreign',
  templateUrl: './foreign.component.html',
  styleUrls: ['../../form.css', './foreign.component.css']
})


export class ForeignComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  formData: FormGroup;
  listForeignForm = new Collections.LinkedList<ForeignForm>();
  positionUpdate = -1;

  constructor(public nationalService: NationalService,protected eleRef: ElementRef) {
    super(eleRef);
    let item: ForeignForm = {
      dateFrom: '20/10/2015',
      dateEnd: '20/10/2016',
      national: 'not',
      organInvite: 'cn',
      product: 'bai bao',
      nameOrganInvite: 'CNLB duc',
      purpose: 'Lao dong',
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

  }

  addItem() {
    if (this.positionUpdate > -1) {
      this.listForeignForm.removeElementAtIndex(this.positionUpdate);
      this.listForeignForm.add(this.formData.value, this.positionUpdate);
    } else {
      this.listForeignForm.add(this.formData.value);
    }
    this.positionUpdate = -1;
    this.closeModal(this.modal);
    this.resetForm();
  }

  resetForm() {
    this.formData.patchValue({
      dateFrom: '',
      dateEnd: '',
      national: 'not',
      product: 'bai bao',
      purpose: 'Lao dong',
      nameOrganInvite: 'CNLB duc',
    })
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
      product: edit.product,
      purpose: edit.purpose,
      nameOrganInvite: edit.nameOrganInvite,
    });
    this.positionUpdate = index;
    this.openModal(this.modal);
  }


}

interface  ForeignForm {
  dateFrom: string,
  dateEnd: string,
  national: string,
  organInvite: string,
  product: string,
  purpose: string,
  nameOrganInvite: string,
}
