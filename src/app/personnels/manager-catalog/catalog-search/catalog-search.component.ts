import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.css']
})
export class CatalogSearchComponent implements OnInit {
  @Output() textChange = new Subject();
  @Output() numberViewChange = new Subject();
  @Input() numberShow = 10;

  constructor() {
  }

  ngOnInit() {
  }

  textChangeEvent(value) {
    this.textChange.next(value);
  }

  numberViewChangeEvent(value) {
    this.numberViewChange.next(value);
  }
}
