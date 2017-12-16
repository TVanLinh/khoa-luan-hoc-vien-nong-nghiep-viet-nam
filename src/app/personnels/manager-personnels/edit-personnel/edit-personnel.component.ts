import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {ValidService} from "../../../shares/valid.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {UserModel} from "../add-personnel/user.model";
import {Config} from "../../../shares/config";
import {MystorageService} from "../../../shares/mystorage.service";

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['../../form.css', './edit-personnel.component.css']
})
export class EditPersonnelComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalEdit') modalEdit: MouseEvent;

  showPass = false;
  formData: FormGroup;
  listFaculty: CatalogFacultyModel[] = [];
  listLevel1: CatalogFacultyModel[] = [];
  listLevel2: CatalogFacultyModel[] = [];
  formTouched = false;
  rePassTouch = false;
  user: any;

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService,
              public  catalogService: CatalogFacultyService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getCatalogFaculty();
    this.initForm();
    // console.log(JSON.stringify(this.catalogService.getList()));
  }

  level1Change(idParent) {
    this.listLevel2 = this.catalogService.findByIdParent(this.listFaculty, idParent);
  }

  getCatalogFaculty() {
    this.catalogService.getList().subscribe((data: any[]) => {
      this.listFaculty = data;
      this.listLevel1 = this.catalogService.findByLevel(this.listFaculty, 1);
    });
  }

  private initForm() {
    this.formData = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required]],
      birthDay: [new Date(), Validators.required],
      // passWord: ['', Validators.required],
      reason: ['', Validators.required],
      sex: ['', Validators.required],
      // rePassWord: ['', Validators.required],
      active: [true]
    });
  }

  onSubmit() {
    this.formTouched = true;
    let valueForm = this.formData.value;

    let valid = [valueForm.fullName, valueForm.reason,
      valueForm.email, valueForm.birthDay,
      valueForm.sex];

    if (!ValidService.isNotBlanks(valid) || !ValidService.validEmail(valueForm.email)
      || !this.formData.valid) {
      return;
    }


    this.user.fullname = valueForm.fullName.trim();
    this.user.email = valueForm.email.trim();
    // this.user.hashedPass = valueForm.passWord;
    this.user.sex = valueForm.sex;
    this.user.birthDay = valueForm.birthDay;
    this.user.activated = valueForm.active;

    this.taskService.put(Config.USER_URL, {
      user: this.user,
      reason: valueForm.reason,
      username: MystorageService.getAcount()['user']['username']
    }).subscribe(data => {
      this.updateMessge(" Cập nhật thành công", "success");
    }, err => {
      this.updateMessge(" Cập nhật không thành công", "warning");
    });

  }

  resetForm() {
    this.formData.reset();
    this.formData.patchValue({
      personnelCode: this.user.username
    });
    this.formTouched = false;
    this.rePassTouch = false;
  }

  validEmail(email) {
    return ValidService.validEmail(email);
  }

  onChoiseHandler($event) {
    this.formTouched = false;
    this.user = $event;
    this.formData.patchValue({
      fullName: this.user.fullname,
      email: this.user.email,
      birthDay: this.user.birthDay,
      sex: this.user.sex,
      active: this.user.activated
    });
    super.openModal(this.modalEdit);
  }

}
