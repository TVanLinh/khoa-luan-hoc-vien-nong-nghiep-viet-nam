import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExcelService} from "../../../../shares/excel.service";

@Component({
  selector: 'app-statistic-table',
  templateUrl: './statistic-table.component.html',
  styleUrls: ['./statistic-table.component.css', "../../../form.css"]
})
export class StatisticTableComponent implements OnInit {
  @Input() data: any[];
  @Input() title: string;
  @Output() onClick = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<any>();
  @Input() fields: [{ caption: string, type?: string, field: string ,width?:number}];

  // @Output(list)
  constructor(public exelService: ExcelService) {
  }

  ngOnInit() {
  }

  onClickShare(item) {
    this.onClick.next(item);
  }

}
