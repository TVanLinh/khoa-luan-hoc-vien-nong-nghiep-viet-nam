﻿import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../../personnels/base-form.component";
import {FormGroup, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MenuUtil} from "../../../shares/menu.util";
import {Config} from "../../../shares/config";
import {TaskService} from "../../../shares/task.service";
import {MystorageService} from "../../../shares/mystorage.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ValidService} from "../../../shares/valid.service";
import {AcountShareService} from "../../../shares/acount-share.service";

declare var jQuery: any;

@Component({
  selector: 'app-tab-left',
  templateUrl: './tab-left.component.html',
  styleUrls: ['../tabs.component.css', './tab-left.component.css']
})
export class TabLeftComponent extends BaseFormComponent implements OnInit {
  @ViewChild('formForget') formForget: ModalComponent;
  formDataLogin: FormGroup;
  faculty: any[] = [];
  departments: any[] = [];
  isLogin = false;

  // menuApp = MenuUtil.getMenuApp();
  menuApp: any[] = [];

  user = null;

  openMenu(item) {
    let nextMenu;

    switch (item.href) {
      case '/manager/info':
        nextMenu = {
          type: MenuUtil.MENU_INFO_CV,
          native: true
        };
        break;
      case '/manager/manager-personnel':
        nextMenu = {
          type: MenuUtil.MENU_MANGER_PERSONEL,
          native: false
        };
        break;
      case '/manager/search':
        nextMenu = {
          type: MenuUtil.SEARCH,
          native: false
        };
        break;
      case '/manager/statistic':
        nextMenu = {
          type: MenuUtil.STATISTIC,
          native: false
        };
        break;
      case '/manager/manager-system':
        nextMenu = {
          type: MenuUtil.MENU_MANGER_SYSTEM,
          native: false
        };
        break;
      case '/manager/manager-catalog':
        nextMenu = {
          type: MenuUtil.MENU_MANGER_CATALOG,
          native: false
        };
        break;
    }

    // MenuUtil.saveMenuLocal(nextMenu);
    MenuUtil.publishMenu(nextMenu);
    this.router.navigate([item.href]);

  }

  openMenu2(item, active) {
    this.active(active);
    if (!this.user) {
      this.user = MystorageService.getAcount()['user'];
    }
    if (this.user && this.user['roles']) {
      for (let ite of this.user['roles']) {
        if (item.title.trim().toLowerCase() == Config.MYCV.trim().toLowerCase()) {
          let share = {
            type: item.title,
            native: true
          };
          MenuUtil.publishMenu(share);
          this.router.navigate(['/manager/info']);
          return;
        }

        if (ite.title.trim().toLowerCase() == item.title.trim().toLowerCase() && ite['frontends'] && ite['frontends'].length != 0) {
          // console.log(JSON.stringify(ite));
          let share = {
            type: item.title,
            native: false
          };
          MenuUtil.publishMenu(share);
          this.router.navigate([ite['frontends'][0]['url']]);
        }
      }
    }
  }

  constructor(protected _eref: ElementRef, public taskService: TaskService,
              public catalogFacultyService: CatalogFacultyService, private acountService: AcountShareService,
              private  router: Router) {
    super(_eref, taskService);
    this.user = MystorageService.getAcount() ? MystorageService.getAcount()['user'] : null;
    this.acountService.logoutListener.subscribe(data => {
      this.isLogin = false;
    });
  }

  toggleTab(): void {
    jQuery(this._eref.nativeElement).find('.icon-tab-open').toggleClass('icon-open-tab-toggle');
    jQuery(this._eref.nativeElement).find('.tab-left').toggleClass('tab-left-toggle');

    jQuery(this._eref.nativeElement).find('#tab-left').toggleClass('z-index-50');
  }


  ngOnInit() {
    this.getCatalogFaculty();
    this.initForm();
    this.isLogin = MenuUtil.isLogin;
    console.log("user: " + JSON.stringify(this.user));

    if (this.user != null) {
      this.isLogin = true;

      this.menuApp = [];
      for (let item of this.user['roles']) {
        this.menuApp.push({href: '', title: item['title']});
      }
    }


  }


  initForm() {
    this.formDataLogin = this.formBuilder.group({
      userName: [''],
      passWord: ['']
    });
  }

  onLogin(loginModal) {

    let data = {
      username: this.formDataLogin.value.userName,//.toUpperCase()
      password: this.formDataLogin.value.passWord
    };
    this.taskService.postLogin(Config.HOST_SERVER + "/login", data).subscribe((data) => {
      this.isLogin = true;
      this.closeModal(loginModal);
      MystorageService.saveAcount(data);
      this.menuApp = data['user']['roles'];
      console.log(JSON.stringify(this.menuApp));
      let share;

      if (super.contains(this.menuApp, 'title', Config.MYCV)) {
        share = {
          type: Config.MYCV,
          native: true
        };
        MenuUtil.publishMenu(share);
        this.router.navigate(['/manager/info']);
        return;
      }

      if (this.menuApp && this.menuApp[0] && this.menuApp[0]['frontends'] && this.menuApp[0]['frontends'][0]) {
        share = {
          type: this.menuApp[0].title,
          native: false
        };
        MenuUtil.publishMenu(share);
        this.router.navigate([this.menuApp[0]['frontends'][0].url]);
      }

    }, err => {
      this.isLogin = false;
      super.updateMessge("Thông tin không chính sác.!", "warning");
    });
  }

  logout() {
    MenuUtil.isLogin = false;
    this.isLogin = false;
    MystorageService.removeAcount();
    this.router.navigate(['/']);
  }

  getCatalogFaculty() {
    this.catalogFacultyService.getList().subscribe(data => {
      this.faculty = this.catalogFacultyService.findByType(data, 'khoa');
      this.departments = this.catalogFacultyService.findByType(data, 'phongban');
    });
  }


  active(target: any) {
    // console.log(target);
    for (let i = 0; i < this.menuApp.length; i++) {
      console.log(jQuery('#menu-app-item-role-' + i));
      jQuery(this._eref.nativeElement).find('#menu-app-item-role-' + i).css({'color': '#0f0f0f'});
    }
    jQuery(this._eref.nativeElement).find(target).css({'color': '#8d9c00'});
  }

  onForgetPass(forgetPass: NgForm) {

    if (!forgetPass.touched) {
      this.updateMessge("Vui lòng nhập đủ thông tin", "warning");
    }
    let formValue = forgetPass.value;
    if (!ValidService.isNotBlank(formValue['username'])) {
      return;
    }
    if (!ValidService.validEmail(formValue['email'])) {
      return;
    }


    let str = "/forgetPass?username=" + formValue['username'] + "&email=" + formValue['email'];
    this.taskService.get(Config.USER_URL + str, true).subscribe((data) => {
      console.log(data);
      if (data['_body']) {
        let body = JSON.parse(data['_body']);
        this.updateMessge(body['msg'], "warning");
      } else {
        this.updateMessge("Vui lòng kiểm tra email để nhận mật khẩu", "success");
      }
    });
  }

  openModalForgetPass(forgetPass, loginModal) {
    super.closeModal(loginModal);
    setTimeout(() => {
      super.openModal(forgetPass);
    }, 300);
  }

  validEmail(email) {
    return ValidService.validEmail(email);
  }

  getMyCvTitle() {
    return Config.MYCV;
  }

}
