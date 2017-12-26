import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {SelectComponent} from "ng2-select";
import {TaskService} from "../../../shares/task.service";
import {BaseFormComponent} from "../../base-form.component";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";
import {MystorageService} from "../../../shares/mystorage.service";
import {RoleServie} from "../../../shares/role.servie";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['../../form.css', './user-manager.component.css']
})
export class UserManagerComponent extends BaseFormComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('modalDelete') modalDelete: ModalComponent;
  @ViewChild("select") select: SelectComponent;

  user = null;
  rolesCatalog: any[] = [];
  rolesSelect: any[] = [];
  rolesValue = null;
  reason: string = '';
  reasonDelelte: string = '';
  update = null;
  formTouch = false;
  formDeleteTouch = false;

  roleByUserName = [];

  positionDelete = -1;
  username = '';

  constructor(protected eleRef: ElementRef, public taskService: TaskService, public roleService: RoleServie) {
    super(eleRef, taskService);
    this.username = MystorageService.getAcount() ? MystorageService.getAcount()['user']['username'] : '';

  }

  ngOnInit() {
    this.getRolesCatalog();
  }


  onChoiseHandler($event) {
    this.user = $event;
    this.rolesValue = null;
    this.formTouch = false;
    // console.log(JSON.stringify(this.user));
    super.openModal(this.modal);
    // this.taskService.get(Config.USER_URL+"/role?username="+this.user['username'])
  }

  selected(value) {
    // this.rolesValue.add(value);
    this.rolesValue = value;
    console.log("selected " + JSON.stringify(this.rolesValue));
  }

  removed(value) {
    this.rolesValue = null;
  }

  getRolesCatalog() {
    this.taskService.get(Config.ROLE_URL).subscribe(data => {
      this.rolesCatalog = data;
      this.rolesSelect = this.convertDataSelect(this.rolesCatalog);
    });
  }


  onSave() {
    this.formTouch = true;
    if (!ValidService.isNotBlank(this.reason) || !this.rolesValue) {
      return;
    }

    if (super.contains(this.user.roles, '_id', this.rolesValue['id'])) {
      this.updateMessge(this.user['fullname'] + " đã có quyền này ", "warning");
      return;
    }


    let roleTemp = null;

    if ((roleTemp = this.getRoleById(this.rolesValue['id']))) {
      this.user.roles.push(roleTemp);
      this.taskService.post(Config.USER_URL + "/assignRole", {
        user: this.user,
        reason: this.reason,
        username: this.username
      }).subscribe(data => {
        this.updateMessge("Thành công", "success");
      }, err => {
        this.updateMessge("Không thành công", "warning");
      }, () => {
        this.updateRoleLocal();
      });
    }


    // assignRole
  }

  updateRoleLocal() {
    let acount = MystorageService.getAcount();
    if (acount && acount['user'] && acount['user']['username']) {
      this.taskService.get(Config.USER_URL + "/roles?username=" + acount['user']['username']).subscribe(data => {
        acount['user'].roles = data['roles'];
        this.user.roles = data['roles'];
        MystorageService.saveAcount(acount);
        this.roleService.menuRightPublish();
      });
    }
  }


  selectDeleteRole(item) {
    this.positionDelete = -1;

    let idex = -1;
    let roles = this.user.roles;

    for (let i = 0; i < roles.length; i++) {
      if (item.title == roles[i].title) {
        idex = i;
        break;
      }
    }

    if (idex > -1) {
      this.positionDelete = idex;
      this.formDeleteTouch = false;
      super.openModal(this.modalDelete);
    }
  }

  onDelete() {
    this.formDeleteTouch = true;
    if (!ValidService.isNotBlank(this.reasonDelelte)) {
      return;
    }

    delete  this.user.roles[this.positionDelete];

    this.taskService.post(Config.USER_URL + "/assignRole", {
      user: this.user,
      reason: this.reasonDelelte,
      username: this.username
    }).subscribe(data => {
      this.reasonDelelte = '';
      this.closeModal(this.modalDelete);
      this.updateMessge("Xóa thành công", "success");
    }, err => {
      this.updateMessge("Xóa không thành công", "warning");
    }, () => {
      this.updateRoleLocal();
    });
  }

  getOranTitle() {
    if (!this.user || !this.user.organ) {
      return '';
    }
    return "Đơn vị: " + this.user.organ.level1.name;
  }


  getRoleById(id) {
    for (let item of this.rolesCatalog) {
      if (item['_id'] == id) {
        return item;
      }
    }
    return null;
  }


  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.selectDeleteRole(this.itemDelete);
    }
    super.openModal(this.modal);
  }
}
