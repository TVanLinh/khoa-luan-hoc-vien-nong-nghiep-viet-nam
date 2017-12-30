import {Directive, ElementRef, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: "[app-toggle-class]"
})

export class ToggleClass {
  @Input() classToggle = "";
  @HostBinding('class.bgc-red') isExist = false;

  constructor(private  eleRef: ElementRef) {
  }
  @HostListener('click') onClick() {
    //this.isExist = true;
   // this.eleRef.nativeElement.style.backgroundColor = "#aaa !important";
    console.log("ok");
  }
}
