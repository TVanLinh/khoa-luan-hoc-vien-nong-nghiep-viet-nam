import {Component, ElementRef, OnInit} from "@angular/core";

import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyService} from "app/shares/catalog-faculty.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {UserModel} from "./user.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['../../form.css', './add-personnel.component.css']
})
export class AddPersonnelComponent extends BaseFormComponent implements OnInit {
  showPass = false;
  formData: FormGroup;
  listFaculty: CatalogFacultyModel[] = [];
  listLevel1: CatalogFacultyModel[] = [];
  listLevel2: CatalogFacultyModel[] = [];
  formTouched = false;
  rePassTouch = false;
  username = null;

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
    this.formData.patchValue({level2: ''});
  }

  getCatalogFaculty() {
    this.catalogService.getList().subscribe((data: any[]) => {
      this.listFaculty = data;
      this.listLevel1 = this.catalogService.findByLevel(this.listFaculty, 1);
    });
  }

  private initForm() {
    this.formData = this.formBuilder.group({
      level1: ['', Validators.required],
      level2: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required]],
      birthDay: ['', Validators.required],
      passWord: ['', Validators.required],
      sex: ['', Validators.required],
      rePassWord: ['', Validators.required]
    });
  }

  onSubmit() {
    this.formTouched = true;
    let valueForm = this.formData.value;
    let user = new UserModel();
    let valid = [valueForm.level1, valueForm.fullName,
      valueForm.email, valueForm.birthDay,
      valueForm.passWord, valueForm.sex];

    // valueForm.personnelCode,

    if (!ValidService.isNotBlanks(valid)
      || !ValidService.validEmail(valueForm.email)
      || valueForm.passWord != valueForm.rePassWord) {
      // super.updateMessge("Vui lòng kiểm tra lại thông tin","warning");
      console.log("not pass");
      return;
    }

    console.log("pass");

    let organ = {
      level1: this.catalogService.findById(this.listFaculty, valueForm.level1),
      level2: this.catalogService.findById(this.listFaculty, valueForm.level2)
    };
    user.organ = organ;
    user.fullname = valueForm.fullName;
    user.email = valueForm.email;
    user.hashedPass = valueForm.passWord;
    user.sex = valueForm.sex;
    user.birthDay = valueForm.birthDay;

    this.taskService.post(Config.USER_URL, {data: user}).subscribe(resp => {
      console.log(resp);
      this.username = JSON.parse(resp['_body'])['username'];
    }, err => {
      this.updateMessge("Không thành công", 'success');
    });
  }

  resetForm() {
    this.formData.reset();
    this.formTouched = false;
    this.rePassTouch = false;
  }

  validEmail(email) {
    return ValidService.validEmail(email);
  }

}


interface AddPersonnelForm {
  organ: string,
  listLevel1: string,
  listLevel2: string,
  personnelCode: string,
  fullName: string,
  dateOfBirth: string;
  email: string,
  passWord: string,
  rePassWord: string
}
