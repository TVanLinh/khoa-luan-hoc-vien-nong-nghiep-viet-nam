import {Component, OnInit} from '@angular/core';
import {MystorageService} from "../../../shares/mystorage.service";
import {MenuUtil} from "../../../shares/menu.util";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {AcountShareService} from "../../../shares/acount-share.service";

declare const jQuery: any;

@Component({
  selector: 'app-header-2',
  templateUrl: './header-2.component.html',
  styleUrls: ['./header-2.component.css']
})
export class Header2Component implements OnInit {
  titleName = "Quản lý nhân sự ";
  user = null;
  avatar = null;

  constructor(public router: Router, private  taskService: TaskService, private acountService: AcountShareService) {
    this.acountService.avatarLisener.subscribe(data => {
      this.avatar = data;
      MystorageService.saveAvatar(this.avatar);
    });
  }

  ngOnInit() {
    this.user = MystorageService.getAcount()['user'];
    this.avatar = MystorageService.getAvatar();
    if (this.user && !this.avatar) {
      this.taskService.get(Config.CV_URL + "?username=" + this.user['username']).subscribe(data => {
        this.avatar = data['cv']['avatarUrl'];
        MystorageService.saveAvatar(this.avatar);
      }, err => {
        this.avatar = null;
      });
    }
  }

  toogleMenuLeft() {
    jQuery('#tab-left').css({
      transform: 'translateX(0)'
    });
  }

  logout() {
    MenuUtil.isLogin = false;
    MystorageService.removeAcount();
    this.router.navigate(['/']);
  }


}

