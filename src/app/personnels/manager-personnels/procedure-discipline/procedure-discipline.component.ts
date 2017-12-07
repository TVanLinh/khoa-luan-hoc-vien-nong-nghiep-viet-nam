import {Component, OnInit} from '@angular/core';
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-procedure-discipline',
  templateUrl: './procedure-discipline.component.html',
  styleUrls: ['./procedure-discipline.component.css']
})
export class ProcedureDisciplineComponent implements OnInit {
  name = "discipline";
  title = "Làm thủ tục kỷ luật";
  url = Config.DISCIPLINE_URL;

  constructor() {
  }

  ngOnInit() {
    this.name = "discipline";
    this.title = "Làm thủ tục kỷ luật";
    this.url = Config.DISCIPLINE_URL;
  }

}
