import {Component, ElementRef, OnInit} from "@angular/core";

import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyService} from "app/shares/catalog-faculty.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";

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
    this.listLevel2 = this.catalogService.findByNameParent(this.listFaculty, idParent);
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
      organ: ['gff'],
      department: ['gfgf'],
      personnelCode: [''],
      fullName: [''],
      email: [''],
      dateOfBirth: [''],
      acountSignIn: [''],
      passWord: [''],
      rePassWord: ['']
    });
  }

  onSubmit() {
    let infoPerson: AddPersonnelForm = this.formData.value;
    console.log(infoPerson);
  }

}

interface AddPersonnelForm {
  organ: string,
  department: string,
  personnelCode: string,
  fullName: string,
  dateOfBirth: string;
  email: string,
  acountSignIn: string,
  passWord: string,
  rePassWord: string
}
