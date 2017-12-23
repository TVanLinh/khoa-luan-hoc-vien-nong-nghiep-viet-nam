import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../../shares/config";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import * as Collections from "typescript-collections";

@Component({
  selector: 'app-catalog-nation',
  templateUrl: './catalog-nation.component.html',
  styleUrls: ['../../form.css', './catalog-nation.component.css']
})
export class CatalogNationComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  positionUpdate = -1;
  inputData = "";
  mode = 0;
  update = null;
  numberShow = 10;
  msg = '';

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  list = new Collections.LinkedList<any>();
  lisTemp = new Collections.LinkedList<any>();

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.taskService.get(Config.CATALOG_NATION_URL).subscribe((data: any[]) => {
      this.list = super.asList(data);
      this.lisTemp = super.asList(data);
    });
  }

  onSave() {
    this.inputData = this.inputData.trim();
    if (this.inputData == "") {
      this.msg = 'Chưa nhập tên dân tộc';
      return;
    }

    if (this.update == null && super.contains(this.list.toArray(), 'name', this.inputData)) {
      this.msg = 'Dân tộc này đã có rồi';
      return;
    }

    let temp = false;
    for (let item of this.lisTemp.toArray()) {
      if (item.name && item.name.toLowerCase() == this.inputData.toLowerCase() &&
        this.update.name.toLowerCase() != this.inputData.toLowerCase()) {
        temp = true;
      }
    }
    if (temp) {
      this.msg = 'Dân tộc này đã có rồi';
      return;
    }

    this.msg = '';


    if (this.update == null) {
      let body = {name: this.inputData};
      this.taskService.post(Config.CATALOG_NATION_URL, {data: body}).subscribe(data => {
        body['_id'] = JSON.parse(data["_body"])._id;
        // console.log(JSON.stringify(data));
        this.list.add(body, 0);
        this.lisTemp.add(body, 0);
        this.updateMessge("Thêm thành công", "success");
      }, err => {
        this.updateMessge("Thêm không thành công", "warning");
      }, () => {
        this.closeModal(this.modal);
      });
    } else {
      this.update['name'] = this.inputData;
      let body = {_id: this.update['_id'], name: this.inputData};
      this.taskService.put(Config.CATALOG_NATION_URL, {data: body}).subscribe(data => {
        // body['name'] = data["name"];
        super.updateList(this.list, this.update, body);
        super.updateList(this.lisTemp, this.update, body);
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
    this.msg = '';
  }

  editItem(item) {
    console.log(JSON.stringify(item));
    this.inputData = item.name;
    this.update = item;
    this.msg = '';
    this.openModal(this.modal);
  }

  removeItem(item) {
    console.log(JSON.stringify(item));
    this.taskService.delete2(Config.CATALOG_NATION_URL, {id: item._id}).subscribe(data => {
      this.updateMessge("Xóa thành công", "success");
      this.list.remove(item);
    }, err => {
      this.updateMessge("Xóa không thành công", "warning");
    }, () => {

    });
  }

  textChangeListener(query) {
    let str = query.trim();
    if (str == '') {
      this.list = super.clone(this.lisTemp.toArray());
    } else {
      this.list.clear();
      for (let item of this.lisTemp.toArray()) {
        if (item.name.trim().toLowerCase().indexOf(str) != -1) {
          this.list.add(item);
        }
      }
    }

  }

  numberViewChangeListener(query) {
    this.numberShow = query;
  }


  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }
}

