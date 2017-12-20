import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Collections from "typescript-collections";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {SelectComponent} from "ng2-select";
import {ValidService} from "../../../shares/valid.service";
import {MystorageService} from "../../../shares/mystorage.service";


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
  roleTemps = new Collections.LinkedList<any>();
  roleDetail = null;
  update = null;

  frontendsCatalog: any[] = [];
  backendsCatalog: any[] = [];

  frontendsSelect: any[] = [];
  backendsSelect: any[] = [];

  fontendValues = new Collections.LinkedList<any>();
  backendValues = new Collections.LinkedList<any>();

  acivated = false;

  title = '';
  description = '';
  reason = '';

  formTouch = false;
  numberShow = 10;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }


  ngOnInit() {
    this.getDataCatalog();
  }

  getDataCatalog() {
    this.taskService.get(Config.ROLE_URL).subscribe(data => {
      this.roleTemps = super.asList(data);
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
      this.backendsSelect = this.convertDataSelect(this.backendsCatalog, true);
    }, err => {

    });
  }

  viewDetail(item) {
    this.roleDetail = item;
    super.openModal(this.modalDetail);
  }

  editItem(item) {
    this.formTouch = false;
    this.update = item;
    this.fontendValues = super.asList(this.convertDataSelect(item['frontends']));
    this.selectFront.active = [];
    for (let temp of this.fontendValues.toArray()) {
      this.selectFront.active.push(temp);
    }

    this.title = item['title'];
    this.description = item['description'];
    this.reason = '';

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
    this.selectBack.active = [];
    this.selectFront.active = [];
    this.title = '';
    this.description = '';
    this.reason = '';
    this.acivated = false;
    this.formTouch = false;
    super.openModal(this.modalCreate);
  }

  removeItem(item) {
    this.taskService.post(Config.ROLE_URL + "/delete", {role: item}).subscribe(data => {
      this.roles.remove(item);
      this.roleTemps.remove(item);
      super.updateMessge("Xóa thành công", "success");
    }, err => {
      super.updateMessge("Xóa không thành công", "success");
    });
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

  onSave() {
    this.formTouch = true;
    let body = {};
    body['activated'] = this.acivated;
    body['frontends'] = this.getIdDataArg(this.fontendValues.toArray());
    body['backends'] = this.getIdDataArg(this.backendValues.toArray());

    body['title'] = this.title.trim();
    body['description'] = this.description.trim();

    let username = MystorageService.getAcount()['user']['username'];
    let reason = this.reason;

    if (!ValidService.isNotBlanks([this.title, this.description, this.reason])) {
      return false;
    }

    if (!this.update) {
      if (super.contains(this.roles.toArray(), 'title', this.title)) {
        super.updateMessge("Tên chức vụ " + this.title.trim() + " đã tồn tại", "warning");
        return;
      }
      this.taskService.put(Config.ROLE_URL + "/", {
        role: body,
        reason: this.reason,
        username: username
      }).subscribe(data => {
        // this.roles.add(JSON.parse(data['_body']), 0);
        this.getDataCatalog();
        super.updateMessge("Thêm thành công", "success");
        setTimeout(() => {
          super.closeModal(this.modalCreate);
        }, 1000);
      }, err => {
        super.updateMessge("Thêm không thành công", "warning");
      });

    } else {
      let temp = super.clone(this.roles.toArray());
      temp.remove(this.update);
      body['_id'] = this.update._id;
      body['createdOn'] = this.update.createdOn;


      if (super.contains(temp.toArray(), 'title', this.title)) {
        super.updateMessge("Tên chức vụ " + this.title.trim() + " đã tồn tại", "warning");
        return;
      }

      if (this.update.title.toUpperCase().trim() == Config.MYCV.toUpperCase().trim()) {
        body['title'] = this.update.title;
      }

      this.taskService.post(Config.ROLE_URL + "/", {
        role: body,
        reason: this.reason,
        username: username
      }).subscribe(data => {
        super.updateMessge("Cập nhật thành công", "success");
        this.getDataCatalog();
        // super.updateList(this.roles, this.update, body);
        setTimeout(() => {
          super.closeModal(this.modalCreate);
        }, 1000);
      }, err => {
        super.updateMessge("Cập nhật không thành công", "warning");
      });
    }
  }

  getIdDataArg(array: any[]) {
    let temp = [];
    for (let item of array) {
      temp.push(item['id']);
    }
    return temp;
  }


  textChangeListener(event) {
    let str = event.trim();
    if (str == '') {
      this.roles = super.asList(this.roleTemps.toArray());
    } else {
      str = str.toLowerCase();
      let temp = [];
      this.roles.clear();
      for (let item of this.roleTemps.toArray()) {
        let date = new Date(item.createdOn);
        let formatDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " +
          date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        if (item.title.toLowerCase().indexOf(str) != -1 ||
          item.description.toLowerCase().indexOf(str) != -1 ||
          "Not Activated".toLowerCase().indexOf(str) != -1 ||
          // ((date.getMonth() + 1) + "").indexOf(str) != -1 ||
          // ((date.getDate() + "")).indexOf(str) != -1 ||
          // (date.getFullYear() + "").indexOf(str) != -1 ||
          (formatDate).indexOf(str) != -1 ||
          (item.activated + "").toLowerCase().indexOf(str) != -1) {
          temp.push(item);
        }
      }
      console.log("tem " + temp.length);
      // this.roles.clear();
      this.roles = super.asList(temp);
    }
  }

  numberViewChangeListener(query) {
    this.numberShow = query;
  }


}
