import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['../../form.css', './edit-personnel.component.css']
})
export class EditPersonnelComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalEdit') modalEdit: MouseEvent;
  showPass = false;
  formSearch: FormGroup;
  formData: FormGroup;
  item = {
    personnelCode: "CB001",
    fullName: "Tran Van Linh",
    email: "linhtran180895",
    dateOfBirth: '180/08/95',
    acountSignIn: "tvlinh",
  };

  editItem(item: any) {
    this.formData.patchValue({
      fullName: item.fullName,
      personnelCode: item.personnelCode,
      acountSignIn: item.acountSignIn
    });
    this.openModal(this.modalEdit);
  }

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formSearch = this.formBuilder.group({
      department: [''],
      nameOrCodePersonnel: ['']
    });

    this.formData = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      acountSignIn: [''],
      passWord: [''],
      rePassWord: ['']
    });
  }

  onChoiseHandler($event) {
    window.alert($event['fullname']);
    console.log($event);
  }

}
