import {Component, ElementRef} from "@angular/core";
declare const jQuery: any;
@Component({
  selector: "app-manager-personnel",
  templateUrl: './personnels.component.html',
  styleUrls: ['../../menu-app/menu-app.component.css','./personnels.component.css',]
})
export class PersonnelManagerComponent {

  constructor(private eleRef: ElementRef) {

  }

}
