import {Component, ElementRef, OnInit} from "@angular/core";
import {BaseFormComponent} from "../../../personnels/base-form.component";
import {FormGroup} from "@angular/forms";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {MenuUtil} from "../../../shares/menu.util";
import {Config} from "../../../shares/config";
import {TaskService} from "../../../shares/task.service";
import {MystorageService} from "../../../shares/mystorage.service";

declare var jQuery: any;

@Component({
  selector: '[app-tab-left]',
  templateUrl: './tab-left.component.html',
  styleUrls: ['../tabs.component.css', './tab-left.component.css']
})
export class TabLeftComponent extends BaseFormComponent implements OnInit {
  formDataLogin: FormGroup;
  faculty = [
    {href: "", title: "Khoa Chăn nuôi"},
    {href: "", title: "Khoa công nghệ thực phẩm",},
    {href: "", title: "Khoa Cơ điện"},
    {href: "", title: "Khoa Công nghệ sinh học"},
    {href: "", title: "Khoa Giáo dục quốc phòng"},
    {href: "", title: "Khoa Kinh tế và Phát triển nông thôn"},
    {href: "", title: "Khoa Lý luận chính trị và Xã hội"},
    {href: "", title: "Khoa Môi trường"},
    {href: "", title: " Khoa Nông học"},
    {href: "", title: " Khoa Quản lý đất đai"},
    {href: "", title: " Khoa Thú y"},
    {href: "", title: "   Khoa Thủy sản"},
  ];

  departments = [
    {href: "", title: "Khoa Chăn nuôi"},
    {href: "", title: "Khoa công nghệ thực phẩm",},
    {href: "", title: "Khoa Cơ điện"},
    {href: "", title: "Khoa Công nghệ sinh học"},
    {href: "", title: "Khoa Giáo dục quốc phòng"},
    {href: "", title: "Khoa Kinh tế và Phát triển nông thôn"},
    {href: "", title: "Khoa Lý luận chính trị và Xã hội"},
    {href: "", title: "Khoa Môi trường"},
    {href: "", title: " Khoa Nông học"},
    {href: "", title: " Khoa Quản lý đất đai"},
    {href: "", title: " Khoa Thú y"},
    {href: "", title: "   Khoa Thủy sản"},
  ];
  isLogin = false;

  menuApp = MenuUtil.getMenuApp();

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
      case '/manager/search-statistic':
        nextMenu = {
          type: MenuUtil.SEARCH_STATISTIC,
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

    MenuUtil.publishMenu(nextMenu);
  }

  constructor(protected _eref: ElementRef, private taskService: TaskService, private  router: Router) {
    super(_eref);
  }

  toggleTab(): void {
    jQuery(this._eref.nativeElement).find('.icon-tab-open').toggleClass('icon-open-tab-toggle');
    jQuery(this._eref.nativeElement).find('.tab-left').toggleClass('tab-left-toggle');

    jQuery(this._eref.nativeElement).find('#tab-left').toggleClass('z-index-50');
  }


  ngOnInit() {
    this.initForm();
    this.isLogin = MenuUtil.isLogin;
    if (MystorageService.getAcount() != null) {
      console.log("MystorageService.getAcount() " + MystorageService.getAcount()['user']);
      this.isLogin = true;
    }
  }


  initForm() {
    this.formDataLogin = this.formBuilder.group({
      email: [''],
      passWord: ['']
    });
  }

  onLogin(loginModal) {
    // this.isLogin = true;
    // this.router.navigate(['manager/info']);
    // //
    // MenuUtil.isLogin = true;
    // this.closeModal(loginModal);
    // let a = {
    //   type: MenuUtil.MENU_INFO_CV,
    //   native: true
    // };
    //
    // MenuUtil.publishMenu(a);

    let data = {username: "appAdmin", password: "admin123"};
    this.taskService.postLogin(Config.HOST_SERVER + "/login", data).subscribe((data) => {
      this.isLogin = true;
      this.closeModal(loginModal);
      let a = {
        type: MenuUtil.MENU_INFO_CV,
        native: true
      };
      MystorageService.saveAcount(data);
      MenuUtil.publishMenu(a);
      this.router.navigate(['manager/info']);
    });
  }

  logout() {
    MenuUtil.isLogin = false;
    this.isLogin = false;
    MystorageService.removeAcount();
  }

}
