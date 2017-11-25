import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import * as  Collections from "typescript-collections";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-catalog-academic-rank',
  templateUrl: './catalog-academic-rank.component.html',
  styleUrls: ['./catalog-academic-rank.component.css', "../../form.css"]
})
export class CatalogAcademicRankComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  positionUpdate = -1;
  inputData = "";
  mode = 0;
  update = null;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  list = new Collections.LinkedList<any>();

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.taskService.get(Config.CATALOG_ACADEMIC_RANK_URL).subscribe((data: any[]) => {
      this.list = super.asList(data);
    });
  }

  onSave() {

    if (this.inputData.trim() == "") {
      return "";
    }

    if (this.update == null) {
      let body = {name: this.inputData};
      this.taskService.post(Config.CATALOG_ACADEMIC_RANK_URL, {data: body}).subscribe(data => {
        body['_id'] = data["_id"];
        this.list.add(body);
        this.updateMessge("Thêm thành công", "success");
      }, err => {
        this.updateMessge("Thêm không thành công", "warning");
      }, () => {
        this.closeModal(this.modal);
      });
    } else {
      this.update['name'] = this.inputData;
      let body = {_id: this.update['_id'], name: this.inputData};
      this.taskService.put(Config.CATALOG_ACADEMIC_RANK_URL, {data: this.update}).subscribe(data => {
        body['name'] = data["name"];
        super.updateList(this.list, this.update, body);
        this.updateMessge("Cập nhật thành công", "success");
      }, err => {
        this.updateMessge("Cập nhật  không thành công", "warning");
      }, () => {
        this.closeModal(this.modal);
        this.update = null;
      });
    }
  }

  openModals() {
    this.openModal(this.modal);
    this.inputData = '';
    this.update = null;
  }

  editItem(item) {
    console.log(JSON.stringify(item));
    this.inputData = item.name;
    this.update = item;
    this.openModal(this.modal);
  }

  removeItem(item) {
    this.taskService.delete2(Config.CATALOG_ACADEMIC_RANK_URL, {id: item._id}).subscribe(data => {
      this.updateMessge("Xóa thành công", "success");
      this.list.remove(item);
    }, err => {
      this.updateMessge("Xóa không thành công", "warning");
    }, () => {

    });
  }
}
