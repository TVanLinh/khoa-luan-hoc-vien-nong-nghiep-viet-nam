import {Component, ElementRef} from "@angular/core";
import {MenuUtil} from "./utils/menu.util";
declare const jQuery: any;
@Component({
  selector: "app-manager-personnel",
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelManagerComponent {
  menuRight = MenuUtil.getMenuApp();
  menuInfo = MenuUtil.getMenuFeaturePerson();
  menuManager = MenuUtil.getMenuManagerPerson();

  constructor(private eleRef: ElementRef) {

  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }
}
