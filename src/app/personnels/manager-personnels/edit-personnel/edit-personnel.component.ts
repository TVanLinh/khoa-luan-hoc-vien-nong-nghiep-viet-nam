import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {ValidService} from "../../../shares/valid.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {UserModel} from "../add-personnel/user.model";
import {Config} from "../../../shares/config";

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
      level1: ['', Validators.required],
      level2: [''],
      personnelCode: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required]],
      birthDay: [new Date(), Validators.required],
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

    if (!ValidService.isNotBlanks(valid) || !ValidService.validEmail(valueForm.email)
      || !this.formData.valid || valueForm.passWord != valueForm.rePassWord) {
      // super.updateMessge("Vui lòng kiểm tra lại thông tin","warning");
      return;
    }

    let organ = {
      level1: this.catalogService.findById(this.listFaculty, valueForm.level1),
      level2: this.catalogService.findById(this.listFaculty, valueForm.level2)
    };
    user.organ = organ;
    user.username = valueForm.personnelCode;
    user.fullname = valueForm.fullName;
    user.email = valueForm.email;
    user.hashedPass = valueForm.passWord;
    user.sex = valueForm.sex;
    user.birthDay = valueForm.birthDay;


    //this.pushObjectServer(Config.USER_URL, 'data', user);

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
    this.listLevel2 = this.catalogService.findByIdParent(this.listFaculty, this.user.organ.level1._id);
    this.formData.patchValue({
      level1: this.user.organ.level1._id,
      level2: this.user.organ.level2._id,
      personnelCode: this.user.username,
      fullName: this.user.fullname,
      email: this.user.email,
      birthDay: this.user.birthDay,
      sex: this.user.sex
    });
    super.openModal(this.modalEdit);
  }

}
