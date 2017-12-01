import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../manager-personnels/add-personnel/user.model";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css','../../form.css']
})
export class SearchComponent extends BaseFormComponent implements OnInit {
  userDetail: UserModel;
  @ViewChild("modal") modal: ModalComponent;

  constructor(protected eleRef: ElementRef, taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
  }


  onChoiseHandler($event) {
    this.userDetail = $event;
    super.openModal(this.modal);
  }


  getMsgFac(type) {
    if(type === 'khoa') {
      return "khoa";
    }else{
      return "";
    }
  }

}
