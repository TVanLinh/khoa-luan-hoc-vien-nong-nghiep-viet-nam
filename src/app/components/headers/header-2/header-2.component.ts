import {Component, OnInit} from '@angular/core';
import {MystorageService} from "../../../shares/mystorage.service";
import {MenuUtil} from "../../../shares/menu.util";
import {Router} from "@angular/router";

declare const jQuery: any;

@Component({
  selector: 'app-header-2',
  templateUrl: './header-2.component.html',
  styleUrls: ['./header-2.component.css']
})
export class Header2Component implements OnInit {
  titleName = "Quản lý nhân sự ";
  user = null;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.user = MystorageService.getAcount()['user'];
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

