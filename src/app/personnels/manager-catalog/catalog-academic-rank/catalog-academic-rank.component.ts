import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import * as  Collections from "typescript-collections";
import {TaskService} from "../../../shares/task.service";

@Component({
  selector: 'app-catalog-academic-rank',
  templateUrl: './catalog-academic-rank.component.html',
  styleUrls: ['./catalog-academic-rank.component.css', "../../form.css"]
})
export class CatalogAcademicRankComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  positionUpdate = -1;
  inputData = "";

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  list = new Collections.LinkedList<string>();

  ngOnInit() {
  }

  onSave() {
    if (this.inputData !== '') {
      this.list.add(this.inputData);
    }
    console.log(this.inputData);
    this.modal.close();

  }

}
