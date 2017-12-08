import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Collections from "typescript-collections";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {SelectComponent} from "ng2-select";


@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['../../form.css', './role-manager.component.css']
})

export class RoleManagerComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalDetail') modalDetail: ModalComponent;
  @ViewChild('modalCreate') modalCreate: ModalComponent;
  @ViewChild('selectFront') selectFront: SelectComponent;
  @ViewChild('selectBack') selectBack: SelectComponent;

  roles = new Collections.LinkedList<any>();
  roleDetail = null;
  update = null;

  frontendsCatalog: any[] = [];
  backendsCatalog: any[] = [];

  frontendsSelect: any[] = [];
  backendsSelect: any[] = [];

  fontendValues = new Collections.LinkedList<any>();
  backendValues = new Collections.LinkedList<any>();

  acivated = false;

  title = [''];

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }


  ngOnInit() {
    this.getDataCatalog();
  }

  getDataCatalog() {
    this.taskService.get(Config.ROLE_URL).subscribe(data => {
      this.roles = super.asList(data);
    }, err => {

    });
    this.taskService.get(Config.FONTEND_URL).subscribe(data => {
      this.frontendsCatalog = data;
      this.frontendsSelect = this.convertDataSelect(this.frontendsCatalog);
    }, err => {

    });
    this.taskService.get(Config.BACKEND_URL).subscribe(data => {
      this.backendsCatalog = data;
      this.backendsSelect = this.convertDataSelect(this.backendsCatalog);
    }, err => {

    });
  }

  viewDetail(item) {
    this.roleDetail = item;
    super.openModal(this.modalDetail);
  }

  editItem(item) {
    this.update = item;
    this.fontendValues = super.asList(this.convertDataSelect(item['frontends']));
    this.selectFront.active = [];
    for (let temp of this.fontendValues.toArray()) {
      this.selectFront.active.push(temp);
    }

    this.title = item['title'];

    this.backendValues = super.asList(this.convertDataSelect(item['backends']));
    this.selectBack.active = [];
    for (let temp of this.backendValues.toArray()) {
      this.selectBack.active.push(temp);
    }

    this.acivated = item['activated'];

    super.openModal(this.modalCreate);
  }

  openModals() {
    this.update = null;
    super.openModal(this.modalCreate);
    this.selectBack.active = [];
    this.selectFront.active = [];
    this.title = [];
    this.acivated = false;
  }

  removeItem(item) {

  }

  public selected(value: any, mode): void {
    if (mode == 0) {
      if (!this.fontendValues.contains(value)) {
        this.fontendValues.add(value);

      }
    } else {

      if (!this.backendValues.contains(value)) {
        this.backendValues.add(value);
      }
    }
  }

  public removed(value: any, mode): void {
    if (mode == 0) {
      for (let item of this.fontendValues.toArray()) {
        if (item.id == value['id']) {
          this.fontendValues.remove(item);
        }
      }

    } else {
      for (let item of this.backendValues.toArray()) {
        if (item.id == value['id']) {
          this.backendValues.remove(item);
        }
      }
    }
  }


  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

}
