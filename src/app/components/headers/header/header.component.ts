import {Component, ElementRef, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: '[app-head]',
  templateUrl: './head1.html',
  styleUrls: ['./header.component.css']
})

export class  HeaderComponent {
  constructor(private _elRef: ElementRef) {}
  toggleSearch(): void {
    this.OnInit();
  }
  OnInit(): any {
    jQuery(this._elRef.nativeElement).find('.search').toggleClass('search-toggle');
    jQuery(this._elRef.nativeElement).find('.find-by').toggleClass('find-by-toggle');
    jQuery(this._elRef.nativeElement).find('.hide-click').toggleClass('opacity-0');
  }
}

