import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {MenuModel} from "../personnels/model/menu.model";

declare const jQuery: any;
import {PageScrollConfig} from 'ng2-page-scroll';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {
  @Input() menus: MenuModel[];
  @Input() cssClass: string;
  @Input() native: boolean;

  constructor(private ele: ElementRef) {
    PageScrollConfig.defaultScrollOffset = 50;
  }

  ngOnInit() {

  }

  active(target: any) {
    for (let i = 0; i < this.menus.length; i++) {
      jQuery(this.ele.nativeElement).find('#menu-app-item-' + i).css({'color': '#fff'});
    }
    jQuery(this.ele.nativeElement).find('#' + target).css({'color': '#8d9c00'});
  }

}
