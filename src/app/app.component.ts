import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './test-person.html',
  templateUrl: './test-person.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {

  }
  // @HostListener('window:mouseover') onMouse() {
  //   console.log(window.pageXOffset)
  // }
}
