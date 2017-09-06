import {Component, OnInit} from "@angular/core";

import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['../../form.css', './edit-personnel.component.css']
})
export class EditPersonnelComponent extends BaseFormComponent implements OnInit {
  showPass = false;
  formData: FormGroup;
  item = {
    personnelCode: "CB001",
    fullName: "Tran Van Linh",
    email: "linhtran180895",
    dateOfBirth: '180/08/95',
    acountSignIn: "tvlinh",
  };

  editItem(item:any) {
    this.formData.patchValue({
      fullName: item.fullName,
      personnelCode: item.personnelCode,
      acountSignIn: item.acountSignIn
    })
  }

  constructor() {
    super();

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formData = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      acountSignIn: [''],
      passWord: [''],
      rePassWord: ['']
    });
  }

}
