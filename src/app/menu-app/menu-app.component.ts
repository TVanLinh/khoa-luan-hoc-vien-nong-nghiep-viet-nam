import {Component, Input, OnInit} from "@angular/core";
import {MenuModel} from "../personnels/model/menu.model";

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {
  @Input() menus: MenuModel[];
  @Input() cssClass: string;
  constructor() {
  }

  ngOnInit() {
  }

}
