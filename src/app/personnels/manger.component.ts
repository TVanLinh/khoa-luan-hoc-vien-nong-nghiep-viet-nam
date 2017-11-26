import {Component, ElementRef, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {MenuUtil} from "../shares/menu.util";
import {MenuModel} from "./model/menu.model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

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
    // this.menuListener.subscribe(data => {
    //   this.menu = data['menu'];
    //   this.native = data['native'];
    //   console.log(JSON.stringify(this.menu));
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listenerMenu();
  }

  listenerMenu() {
    MenuUtil.$menuChange.subscribe(data => {
      // console.log(" listenerMenu " + data.type);
      switch (data.type) {
        case MenuUtil.MENU_INFO_CV :
          this.menu = MenuUtil.getMenuFeatureInfo();
          break;
        case MenuUtil.MENU_MANGER_PERSONEL:
          this.menu = MenuUtil.getMenuManagerPerson();
          // console.log("MenuUtil.getMenuManagerPerson() ");
          break;
        case MenuUtil.MENU_MANGER_CATALOG:
          this.menu = MenuUtil.getMenuCatalog();
          break;
        case MenuUtil.SEARCH_STATISTIC:
          this.menu = MenuUtil.getMenuSearchStatistic();
          break;
      }

      this.native = data.native;
      // console.log(JSON.stringify(this.menu));
      // this.menuListener.next({menu: this.menu, native: this.native});
    });
  }

  ngOnInit() {
    this.listenerMenu();
    this.menu = MenuUtil.getMenuFeatureInfo();
  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }

}
