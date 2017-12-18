import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.css']
})
export class AlertConfirmComponent implements OnInit {
  @ViewChild('modalConfirm') modalConfirm: ModalComponent;

  @Output() onAction = new Subject();

  constructor() {
  }

  ngOnInit() {
  }

  onAccept(value) {
    this.onAction.next(value);
    this.modalConfirm.close();
  }

  open() {
    this.modalConfirm.open();
  }

}
