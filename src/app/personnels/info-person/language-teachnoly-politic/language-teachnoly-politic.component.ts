import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-language-teachnoly-politic',
  templateUrl: './language-teachnoly-politic.component.html',
  styleUrls: ['./language-teachnoly-politic.component.css']
})
export class LanguageTeachnolyPoliticComponent implements OnInit {
  @Input() user: any;
  constructor() { }

  ngOnInit() {
  }

}
