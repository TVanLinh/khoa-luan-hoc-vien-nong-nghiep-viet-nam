import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {SelectComponent} from "ng2-select";
import {TaskService} from "../../../shares/task.service";
import {BaseFormComponent} from "../../base-form.component";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['../../form.css', './user-manager.component.css']
})
export class UserManagerComponent extends BaseFormComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;
  @ViewChild("select") select: SelectComponent;

  user = null;
  rolesCatalog: any[] = [];
  rolesSelect: any[] = [];
  rolesValue = null;
  reason: string = '';
  update = null;
  formTouch = false;

  roleByUserName = [];

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getRolesCatalog();
  }


  onChoiseHandler($event) {
    this.user = $event;
    this.rolesValue = null;
    this.formTouch = false;
    console.log(JSON.stringify(this.user));
    super.openModal(this.modal);
    // this.taskService.get(Config.USER_URL+"/role?username="+this.user['username'])
  }

  selected(value) {
    // this.rolesValue.add(value);
    this.rolesValue = value;
    console.log("selected " + JSON.stringify(this.rolesValue));
  }

  removed(value) {
    // this.rolesValue.remove(value);
    this.rolesValue = null;
    console.log("remove " + this.rolesValue);
  }

  getRolesCatalog() {
    this.taskService.get(Config.ROLE_URL).subscribe(data => {
      this.rolesCatalog = data;
      this.rolesSelect = this.convertDataSelect(this.rolesCatalog);
    });
  }


  onSave() {
    this.formTouch = true;
  }


}
