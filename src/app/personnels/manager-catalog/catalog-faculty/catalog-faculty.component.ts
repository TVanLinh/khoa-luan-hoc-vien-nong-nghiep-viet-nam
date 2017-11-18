import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {CatalogFacultyModel} from "./catalog-faculty.model";
import {NgForm} from "@angular/forms";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {CatalogFacultyPipe} from "./catalog-faculty.pipe";

@Component({
  selector: 'app-catalog-faculty',
  templateUrl: './catalog-faculty.component.html',
  styleUrls: ['./catalog-faculty.component.css', "../../form.css"],
})
export class CatalogFacultyComponent extends BaseFormComponent implements OnInit {
  @ViewChild("modal") modal: ModalComponent;
  // @ViewChild("") formData: NgForm = new NgForm();
  positionUpdate = -1;
  list = new Collections.LinkedList<CatalogFacultyModel>();
  showParent = false;

  // listCatalog  = new
  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  levelFilter = 1;

  ngOnInit() {
    // this.initForm();
    this.getCatalog();
  }

  changeLevel(level) {
    this.showParent = level == 2;
  }

  initForm() {
    // this.formData.form.patchValue({
    //   level: 1
    // });
  }

  onSave(formData: NgForm) {
    let formValue = formData.value;
    console.log(formValue);
    this.showParent = false;
    let body = new CatalogFacultyModel();
    body.name = formValue.name;
    body.level = formValue.level;
    let parent = new CatalogFacultyModel();
    if (formValue.parent != null) {
      body.parent = parent;
      body.parent.id = formValue.parent;
    }
    let data = {
      data: body
    };
    this.taskService.post(Config.CATATLOG_FACUTY_URL, data).subscribe((data) => {
      this.getCatalog();
      super.closeModal(this.modal);
      this.updateMessge("Lưu thành công ", "success");
    }, error => {
      console.log(error);
      super.closeModal(this.modal);
      this.updateMessge("Lưu không thành công ", "waring");
    });
    formData.form.patchValue({
      level: 1
    });
  }

  getCatalog() {
    this.taskService.get(Config.CATATLOG_FACUTY_URL).subscribe((data: any[]) => {
      this.list = super.asList(data);
    });
  }

  removeItem(item) {
    this.taskService.delete(Config.CATATLOG_FACUTY_URL, ["id"], [item._id]).subscribe(() => {
      this.updateMessge("Xóa thành công ", "success");
      this.list.remove(item);
    }, err => {
      this.updateMessge("Xóa không thành công ", "success");
    });
  }

  editItem(item) {

  }
}
