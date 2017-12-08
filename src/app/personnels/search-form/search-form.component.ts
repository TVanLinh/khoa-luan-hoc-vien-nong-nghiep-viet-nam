import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventListener} from "@angular/core/src/debug/debug_node";
import {TaskService} from "../../shares/task.service";
import {Config} from "../../shares/config";
import {BaseFormComponent} from "../base-form.component";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css', "../form.css"]
})
export class SearchFormComponent extends BaseFormComponent implements OnInit {

  staffCode: string = '';
  @Output() onSearch = new EventEmitter<any>();
  @Input() title: string = '';
  @Output() onChoise = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();
  @Input() showAction: boolean = false;
  data: any[] = [];

  constructor(protected eleRef: ElementRef, public  taskSevice: TaskService) {
    super(eleRef, taskSevice);
  }

  ngOnInit() {

  }

  onSearchShare() {
    if (this.staffCode.trim() == '') {
      // console.log("ok");
      // super.updateMessge("Chưa nhập cán bộ ", "warning");
      return;
    }
    this.taskSevice.get(Config.USER_URL + "/find?query=" + this.staffCode).subscribe((data => {
      this.onSearch.next(data);
      this.data = data;
      if (data) {
        // this.updateMessge("Tìm thấy cán bộ với mã cán bộ là " + this.staffCode, "success");
      } else {
        //this.updateMessge("Không tìm thấy cán bộ với mã cán bộ là " + this.staffCode, "warning");
      }
    }), err => {
      this.onSearch.next(null);
      //this.updateMessge("Không tìm thấy cán bộ với mã cán bộ là " + this.staffCode, "warning");
    });
  }

  onChoiseShare(item) {
    this.onChoise.next(item);
  }

  onEditShare(item) {
    this.onEdit.next(item);
  }

  onRemoveShare(item) {
    this.onRemove.next(item);
  }

}
