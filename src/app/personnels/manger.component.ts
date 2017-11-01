import {Component, ElementRef, OnInit} from "@angular/core";
import {MenuUtil} from "../shares/menu.util";
import {MenuModel} from "./model/menu.model";
declare const jQuery: any;
@Component({
  selector: "app-manager",
  templateUrl: './manager.component.html',
  styleUrls: ['../menu-app/menu-app.component.css', './manager.component.css',]
})

export class ManagerComponent implements OnInit {
  native = true;
  titleFeature = "Thông tin nhân sự ";

  menu: MenuModel[];

  constructor(private eleRef: ElementRef) {
    MenuUtil.$menuChange.subscribe(data => {
      switch (data.type) {
        case MenuUtil.MENU_INFO_CV :
          this.menu = MenuUtil.getMenuFeatureInfo();
          break;
        case MenuUtil.MENU_MANGER_PERSONEL:
          this.menu = MenuUtil.getMenuManagerPerson();
          break;
        case MenuUtil.MENU_MANGER_CATALOG:
          this.menu = MenuUtil.getMenuCatalog();
          break;
        case MenuUtil.SEARCH_STATISTIC:
          this.menu= MenuUtil.getMenuSearchStatistic();
          break;
      }

      this.native = data.native;

      // if (data.type === MenuUtil.MENU_INFO_CV) {
      //   console.log(" MenuUtil.$menuChange.subscribe(data =>");
      //   this.menu = MenuUtil.getMenuFeatureInfo();
      // } else if (data.type === MenuUtil.MENU_MANGER_PERSONEL) {
      //   this.menu = MenuUtil.getMenuManagerPerson();
      // }
    });
  }

  ngOnInit() {
    this.menu = MenuUtil.getMenuFeatureInfo();
  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }

}
