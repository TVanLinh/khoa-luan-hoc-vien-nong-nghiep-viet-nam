import {Component, ElementRef, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {MenuUtil} from "../shares/menu.util";
import {MenuModel} from "./model/menu.model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import menu from "devextreme/ui/menu";

declare const jQuery: any;

@Component({
  selector: "app-manager",
  templateUrl: './manager.component.html',
  styleUrls: ['../menu-app/menu-app.component.css', './manager.component.css',]
})

export class ManagerComponent implements OnInit, OnChanges {
  native = true;
  titleFeature = "Thông tin nhân sự ";
  menuListener = new Subject();
  menu: MenuModel[] = [];

  constructor(private eleRef: ElementRef) {
    this.listenerMenu();
  }

  ngOnChanges(changes: SimpleChanges) {
    let data = MenuUtil.getMenuFromLocal();
    this.getMenu(data);
    this.listenerMenu();
  }

  listenerMenu() {
    MenuUtil.$menuChange.subscribe(data => {
      console.log("kjfkfdk: " + JSON.stringify(data));
      data = MenuUtil.getMenuFromLocal();
      this.getMenu(data);
    });
  }

  getMenu(data) {
    if (data) {
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
        case MenuUtil.SEARCH:
          this.menu = MenuUtil.getMenuSearch();
          break;
        case MenuUtil.STATISTIC:
          this.menu = MenuUtil.getMenuStatistic();
          break;
      }
      this.native = data.native;
    }
  }

  ngOnInit() {
    this.getMenu(MenuUtil.getMenuFromLocal());
    this.listenerMenu();
  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }

}
