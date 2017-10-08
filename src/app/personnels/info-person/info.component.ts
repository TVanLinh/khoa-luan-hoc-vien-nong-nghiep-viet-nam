import {Component, ElementRef} from "@angular/core";
import {MenuUtil} from "../../shares/menu.util";
declare const jQuery: any;
@Component({
  selector: "app-info-personels",
  templateUrl: 'info.component.html',
  styleUrls: ['./info.component.css',]
})
export class InfoComponent {
  menuRight = MenuUtil.getMenuApp();
  menuInfo = MenuUtil.getMenuFeaturePerson();
  menuManager = MenuUtil.getMenuManagerPerson();
  titleFeature = "Thông tin nhân sự ";
  constructor(private eleRef: ElementRef) {

  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }

  navigate(feture: string){
    switch (feture) {
      case 'info':
        this.titleFeature = "Thông tin nhân sự ";
        break;
      case 'manager':
        this.titleFeature = "Quản lý tin nhân sự ";
        break;
    }
  }
}