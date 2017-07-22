import {Component, ElementRef} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: '[app-nav-bar]',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css']
})

export class NavbarComponent {
  constructor(private _elRef: ElementRef) {}
  toggleNavbar(): void {
    jQuery(this._elRef.nativeElement).find('#navbar').toggleClass('nav-toggle');
  }
}
