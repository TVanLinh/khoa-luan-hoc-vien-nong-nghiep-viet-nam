import {Component, ElementRef, OnInit} from "@angular/core";
import {BaseFormComponent} from "../../../personnels/base-form.component";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MenuUtil} from "../../../shares/menu.util";
import {Config} from "../../../shares/config";
import {TaskService} from "../../../shares/task.service";
import {MystorageService} from "../../../shares/mystorage.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";

declare var jQuery: any;

@Component({
  selector: '[app-tab-left]',
  templateUrl: './tab-left.component.html',
  styleUrls: ['../tabs.component.css', './tab-left.component.css']
})
export class TabLeftComponent extends BaseFormComponent implements OnInit {
  formDataLogin: FormGroup;
  faculty: any[] = [];
  departments: any[] = [];
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

  openMenu2(item) {
    MenuUtil.publishMenu({
      type: item.title,
      native: false
    });
    let user = MystorageService.getAcount()['user'];
    if (user && user['roles']) {
      for (let ite of user['roles']) {
        if (ite.title == item.title && ite['frontends'] && ite['frontends'].length != 0) {
          this.router.navigate([ite['frontends'][0]['url']]);
        }
      }
    }
  }

  constructor(protected _eref: ElementRef, public taskService: TaskService,
              public catalogFacultyService: CatalogFacultyService,
              private  router: Router) {
    super(_eref, taskService);
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

    if (MystorageService.getAcount() != null) {
      console.log("MystorageService.getAcount() " + MystorageService.getAcount()['user']);
      this.isLogin = true;
      // this.menuApp = MystorageService.getAcount()['user'].roles;
    }
  }


  initForm() {
    this.formDataLogin = this.formBuilder.group({
      userName: [''],
      passWord: ['']
    });
  }

  onLogin(loginModal) {
    // let data = {username: "appAdmin", password: "admin123"};
    // let data = {username: "581597", password: "admin123"};
    let data = {username: this.formDataLogin.value.userName, password: this.formDataLogin.value.passWord};
    this.taskService.postLogin(Config.HOST_SERVER + "/login", data).subscribe((data) => {
      this.isLogin = true;
      this.closeModal(loginModal);
      let a = {
        type: MenuUtil.MENU_INFO_CV,
        native: true
      };
      MenuUtil.publishMenu(a);
      MystorageService.saveAcount(data);
      this.router.navigate(['manager/info']);
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

  hideTabLeft() {
    // jQuery('#tab-left').css({
    //   transform: 'translateX(-340px)'
    // });
  }

}
