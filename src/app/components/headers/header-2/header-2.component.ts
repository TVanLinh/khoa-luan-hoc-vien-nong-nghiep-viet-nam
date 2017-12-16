import {Component, ElementRef, OnInit} from '@angular/core';
import {MystorageService} from "../../../shares/mystorage.service";
import {MenuUtil} from "../../../shares/menu.util";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {AcountShareService} from "../../../shares/acount-share.service";
import {BaseFormComponent} from "../../../personnels/base-form.component";
import {ValidService} from "../../../shares/valid.service";

declare const jQuery: any;

@Component({
  selector: 'app-header-2',
  templateUrl: './header-2.component.html',
  styleUrls: ['./header-2.component.css']
})
export class Header2Component extends BaseFormComponent implements OnInit {
  titleName = "Quản lý nhân sự ";
  user = null;
  avatar = null;

  data = {
    passWord: '',
    newPass: '',
    rePass: ''
  };

  formTouch = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService, public router: Router, private acountService: AcountShareService) {
    super(eleRef, taskService);
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
        if (data && data['cv']['avatarUrl']) {
          this.avatar = data['cv']['avatarUrl'];
          MystorageService.saveAvatar(this.avatar);
        }
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


  onChagePass(changePassModal) {
    this.formTouch = true;
    if (!ValidService.isNotBlanks([this.data.passWord, this.data.rePass, this.data.newPass])) {
      return;
    }
    if (this.data.rePass != this.data.newPass) {
      return;
    }
    let body = {
      username: this.user.username,
      password: this.data.passWord,
      newPass: this.data.newPass
    };

    this.taskService.put(Config.USER_URL + "/changePass", {data: body}).subscribe(data => {
      let info = data.json();
      if (info['msg']) {
        this.updateMessge(info['msg'], "warning");
      } else {
        this.updateMessge("Thay đổi mật khẩu thành công", "success");
      }
    }, err => {
      this.updateMessge("Thay đổi mật khẩu không thành công", "warning");
    });
  }


}

