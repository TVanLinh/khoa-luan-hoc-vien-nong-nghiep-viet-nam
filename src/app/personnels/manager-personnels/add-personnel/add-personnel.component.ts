import {Component, ElementRef, OnInit} from "@angular/core";

import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyService} from "app/shares/catalog-faculty.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";
import {UserModel} from "./user.model";
import {Config} from "../../../shares/config";

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
      console.log(this.listLevel1);
    });
  }

  private initForm() {
    this.formData = this.formBuilder.group({
      level1: ['', Validators.required],
      level2: ['', Validators.required],
      personnelCode: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      passWord: ['', Validators.required],
      rePassWord: ['', Validators.required]
    });
  }

  onSubmit() {
    let valueForm = this.formData.value;
    let user = new UserModel();
    let organ = {
      level1: this.catalogService.findById(this.listFaculty, valueForm.level1),
      level2: this.catalogService.findById(this.listFaculty, valueForm.level2)
    };
    user.organ = organ;
    user.username = valueForm.personnelCode;
    user.fullname = valueForm.fullName;
    user.email = valueForm.email;
    user.hashedPass = valueForm.passWord;

    this.updateView("form-add-user", this.formData.valid);

    this.pushObjectServer(Config.USER_URL, 'data', user);

    let infoPerson: AddPersonnelForm = this.formData.value;

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
