import {Directive, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: "[app-toggle-class]"
})

export class ToggleClass {
  @Input()  classToggle="bgc-red";
  @HostBinding('class.bgc-red') isExist = false;

  // @HostListener('click') click() {
  //   this.isExist = !this.isExist;
  // }

  @HostListener('mouseleave') leave(){
    this.isExist = !this.isExist;
  }

  @HostListener('mouseenter') enter(){
    this.isExist = !this.isExist;
  }
}
