import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "app/shares/task.service";

@Component({
  selector: 'app-check-profile',
  templateUrl: './check-profile.component.html',
  styleUrls: ['./check-profile.component.css']
})
export class CheckProfileComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  user;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
  }

  onChoiseHandler($event) {
    this.user = $event;
    localStorage.setItem("USER_TEMP", JSON.stringify(this.user));
    let mywindow = window.open('/manager/info?user=' + this.user.username, "newWin", "width=" + screen.availWidth + ",height=" + screen.availHeight);
  }
}
