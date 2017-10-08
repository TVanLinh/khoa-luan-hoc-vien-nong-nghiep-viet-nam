import {Component, ElementRef} from "@angular/core";
import {MenuUtil} from "../shares/menu.util";
declare const jQuery: any;
@Component({
  selector: "app-manager",
  templateUrl: './manager.component.html',
  styleUrls: ['../menu-app/menu-app.component.css', './manager.component.css',]
})

export class ManagerComponent {
  menuRight = MenuUtil.getMenuApp();
  menuInfo = MenuUtil.getMenuFeaturePerson();
  menuManager = MenuUtil.getMenuManagerPerson();
  menuLeft = MenuUtil.getMenuFeatureInfo();
  native = true;
  titleFeature = "Thông tin nhân sự ";

  constructor(private eleRef: ElementRef) {

  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }

  navigate(feture: string) {
    switch (feture) {
      case 'info':
        this.titleFeature = "Thông tin nhân sự ";
        this.native = true;
        this.menuLeft = MenuUtil.getMenuFeatureInfo();

        break;
      case 'manager':
        this.titleFeature = "Quản lý tin nhân sự ";
        this.menuLeft = MenuUtil.getMenuManagerPerson();
        this.native = false;
        break;
    }
  }
}
