import {Component, ElementRef, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../personnels/base-form.component";
import {TaskService} from "../../../shares/task.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {Router} from "@angular/router";

@Component({
  selector: '[app-tab-faculty]',
  templateUrl: './tab-faculty.component.html',
  styleUrls: ['../tabs.component.css', './tab-faculty.component.css']
})
export class TabFacultyComponent extends BaseFormComponent implements OnInit {
  faculty: any[] = [];
  departments: any[] = [];

  constructor(protected _eref: ElementRef, public taskService: TaskService,
              public catalogFacultyService: CatalogFacultyService,
              private  router: Router) {
    super(_eref, taskService);
  }

  ngOnInit() {
    this.getCatalogFaculty();
  }


  getCatalogFaculty() {
    this.catalogFacultyService.getList().subscribe(data => {
      this.faculty = this.catalogFacultyService.findByType(data, 'khoa');
      this.departments = this.catalogFacultyService.findByType(data, 'phongban');
    });
  }
}
