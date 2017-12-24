import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base-form.component";
import {CatalogSalaryService} from "../../../shares/catalog-salary.service";
import {TaskService} from "../../../shares/task.service";
import * as Collection from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Config} from "../../../shares/config";
import {Util} from "../../../shares/util";

const LOAI_NGACH = 'loaingach';
const NHOM_NGACH = 'nhomngach';
const NGACH = 'ngach';
const BAC = 'bac';


@Component({
  selector: 'app-catalog-rank',
  templateUrl: './catalog-rank.component.html',
  styleUrls: ['../../form.css', './catalog-rank.component.css']
})

export class CatalogRankComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  catalogRanks = new Collection.LinkedList<any>();
  listSpiece = new Collection.LinkedList<any>();
  listGroup = new Collection.LinkedList<any>();
  listRank = new Collection.LinkedList<any>();
  level = new Collection.LinkedList<any>();
  spiceCurrent = null;
  groupCurrent = null;

  inputData = '';
  levelData = -1;
  salaryData = 0;

  pipe = {
    specie: '',
    group: '',
    rank: '',
    level: ''
  };

  modelCreate1 = {
    title: '',
    label: '',
    label2: '',
    type: ''
  };
  mode = '';
  positionUpdate = null;
  msgCreate1 = '';
  msgCreate2 = '';

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService,
              public  catalogRankService: CatalogSalaryService) {
    super(eleRef, taskService);

  }


  ngOnInit() {
    this.getCatalogs();
  }


  getCatalogs() {
    this.catalogRankService.getData().subscribe(data => {
      this.catalogRanks = super.asList(data);
      this.listSpiece = super.asList(this.catalogRankService.getAllSpeice(this.catalogRanks.toArray()));
      // this.listGroup = this.catalogRankService.
    });
  }

  openSpiece(item) {
    this.spiceCurrent = item;
    this.listGroup = super.asList(item.group);
    this.listRank.clear();
    this.level.clear();
  }

  openGroup(item) {
    this.groupCurrent = item;
    this.listRank = super.asList(item.listRank);
    this.level = super.asList(item.level);
  }

  openModal1(type) {
    this.getModelCreate(type);
    this.msgCreate1 = '';
    this.inputData = '';
    // this.levelData = -1;
    // this.salaryData = -1;
    this.positionUpdate = null;
    super.openModal(this.modal);
  }

  getModelCreate(type) {
    this.modelCreate1.type = type;
    this.mode = 'type';
    if (type == LOAI_NGACH) {
      this.modelCreate1.label = "Tên loại ngạch";
      if (this.positionUpdate) {
        this.modelCreate1.title = 'Cập nhật loại ngạch';
      } else {
        this.modelCreate1.title = 'Thêm loại ngạch';
      }

    } else if (type == NHOM_NGACH) {
      this.modelCreate1.label = "Tên nhóm ngạch";
      if (this.positionUpdate) {
        this.modelCreate1.title = 'Cập nhật nhóm ngạch';
      } else {
        this.modelCreate1.title = 'Thêm nhóm ngạch';
      }
    } else if (type == NGACH) {
      this.modelCreate1.label = "Tên ngạch";
      if (this.positionUpdate) {
        this.modelCreate1.title = 'Cập nhật nhóm ngạch';
      } else {
        this.modelCreate1.title = 'Thêm ngạch';
      }
    } else if (type == BAC) {
      this.modelCreate1.label = "Tên bậc";
      this.modelCreate1.label2 = "Hệ số lương";
      if (this.positionUpdate) {
        this.modelCreate1.title = 'Cập nhật bậc và hệ số lương';
      } else {
        this.modelCreate1.title = 'Thêm bậc và hệ số lương';
        this.levelData = 0;
        if (this.groupCurrent && this.groupCurrent.level) {
          for (let item of this.groupCurrent.level) {
            if (item.name > this.levelData) {
              this.levelData = item.name;
            }
          }
          this.levelData += 1;
        } else {
          this.levelData = 1;
        }
      }
    }

  }

  editItem(item, type) {
    if (type == LOAI_NGACH) {
      this.spiceCurrent = item;
    }
    this.getModelCreate(type);
    this.positionUpdate = item;
    if (item.name) {
      this.inputData = item.name;
    } else {
      this.inputData = item;
    }

    if (type == BAC) {
      this.levelData = item.name;
      this.salaryData = item.salary;
    }

    this.msgCreate1 = '';
    this.msgCreate2 = '';
    super.openModal(this.modal);
  }

  onSave() {
    console.log(JSON.stringify(this.modelCreate1));
    if (this.modelCreate1.type != BAC && (this.inputData = this.inputData.trim()) == '') {
      this.msgCreate1 = "Vui lòng nhập " + this.modelCreate1.label.toLowerCase();
      return;
    } else if (this.modelCreate1.type == BAC) {
      if (this.levelData < 0) {
        this.msgCreate1 = "Bậc phải > 0";
        return;
      }
      if (this.salaryData <= 0) {
        this.msgCreate2 = "Hệ số lương phải >= 0";
        return;
      }
    }

    if (this.positionUpdate) {
      let body = JSON.parse((JSON.stringify(this.positionUpdate)));

      if (this.modelCreate1.type == LOAI_NGACH) {
        if (Util.contains2(this.catalogRanks.toArray(), 'name', this.inputData, this.positionUpdate.name)) {
          this.msgCreate1 = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }
        body.name = this.inputData;

        if (this.spiceCurrent && this.positionUpdate.name && this.spiceCurrent.name == this.positionUpdate.name) {
          this.spiceCurrent.name = this.inputData;
        }
        super.updateList(this.catalogRanks, this.positionUpdate, body);

      } else if (this.modelCreate1.type == NHOM_NGACH) {
        body.name = this.inputData;

        if (Util.contains2(this.spiceCurrent.group, 'name', this.inputData, this.positionUpdate.name)) {
          this.msgCreate1 = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }

        this.spiceCurrent.group = super.updateList(this.listGroup, this.positionUpdate, body).toArray();
      } else if (this.modelCreate1.type == NGACH) {

        if (Util.contains2(this.groupCurrent.listRank, '', this.inputData, this.positionUpdate)) {
          this.msgCreate1 = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }

        super.updateList(this.listRank, this.positionUpdate, this.inputData);
        this.groupCurrent.listRank = this.listRank.toArray();
      } else if (this.modelCreate1.type == BAC) {
        body.name = this.levelData;
        body.salary = this.salaryData;
        if (Util.contains2(this.groupCurrent.level, '', this.levelData + "", this.positionUpdate.name)) {
          this.msgCreate1 = "Bậc này đã tồn tại, vui lòng nhập lại";
          return;
        }
        super.updateList(this.level, this.positionUpdate, body);
        this.groupCurrent.level = this.level.toArray();
      }

      this.msgCreate1 = '';
      this.msgCreate2 = '';

      this.taskService.put(Config.CATALOG_RANK_URL, {data: this.spiceCurrent}).subscribe(data => {
        super.updateMessge("Cập nhật thành công", "success");
      }, err => {
        super.updateMessge("Cập nhật không thành công", "warning");
      });

    } else {
      if (this.modelCreate1.type == LOAI_NGACH) {
        let body = {name: this.inputData};
        if (Util.contains(this.catalogRanks.toArray(), 'name', this.inputData)) {
          this.msgCreate1 = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }
        this.taskService.post(Config.CATALOG_RANK_URL, {data: body}).subscribe(data => {
          let result = JSON.stringify(data['_body']);
          if (result['msg']) {
            console.log("hash msg");
            super.updateMessge("Không thành công, loại ngạch này đã tồn tại", "warning");
          } else {
            body["_id"] = result['_id'];
            super.updateMessge("Thêm thành công", "success");
            this.catalogRanks.add(body, 0);
          }
        }, err => {

        });

      } else {
        if (this.modelCreate1.type == NHOM_NGACH) {
          if (this.spiceCurrent && !this.spiceCurrent.group) {
            this.spiceCurrent.group = [];
          }
          if (Util.contains(this.spiceCurrent.group, 'name', this.inputData)) {
            this.msgCreate1 = "Tên này đã tồn tại, vui lòng nhập lại";
            return;
          }

          this.spiceCurrent.group.push({name: this.inputData});
          // this.taskService.put(Config.CATALOG_RANK_URL, {data: this.spiceCurrent}).subscribe(data => {
          this.listGroup.add({name: this.inputData}, 0);
          // }, err => {
          //
          // });
        } else if (this.modelCreate1.type == NGACH) {
          if (Util.contains(this.groupCurrent.listRank, '', this.inputData)) {
            this.msgCreate1 = "Tên này đã tồn tại, vui lòng nhập lại";
            return;
          }

          if (this.groupCurrent && !this.groupCurrent.group) {
            this.groupCurrent.group = [];
          }

          this.groupCurrent.listRank.push(this.inputData);
          this.listRank.add(this.inputData, 0);
        } else if (this.modelCreate1.type == BAC) {
          if (Util.contains(this.groupCurrent.level, 'name', this.levelData + "")) {
            this.msgCreate1 = "Bậc này đã tồn tại, vui lòng nhập lại";
            return;
          }

          this.groupCurrent.level.push({name: this.levelData, salary: this.salaryData});
          this.level.add({name: this.levelData, salary: this.salaryData}, 0);
        }
        this.msgCreate1 = '';
        this.msgCreate2 = '';
        this.taskService.put(Config.CATALOG_RANK_URL, {data: this.spiceCurrent}).subscribe(data => {
          super.updateMessge("Thêm thành công", "success");
        }, err => {
          super.updateMessge("Thêm không thành công", "warning");
        });
      }

    }
  }


  itemDelete = null;
  modDelete = null;

  confirm(answer) {
    console.log(JSON.stringify(this.itemDelete) + " mode " + this.modDelete);
    if (answer) {
      this.removeItem(this.modDelete);
    }
  }

  removeItem(mode) {
    if (mode == LOAI_NGACH) {
      this.taskService.delete2(Config.CATALOG_RANK_URL, {id: this.itemDelete._id}).subscribe(data => {
        this.catalogRanks.remove(this.itemDelete);
        if (this.spiceCurrent && this.spiceCurrent._id == this.itemDelete._id) {
          this.spiceCurrent = null;
          this.groupCurrent = null;
          this.level.clear();
          this.listGroup.clear();
          this.listRank.clear();
        }
        super.updateMessge("Xóa thành công", 'success');

        setTimeout(() => {
          this.itemDelete = null;
        }, 1000);

        this.modDelete = null;

      }, err => {
        super.updateMessge("Xóa không thành công", 'warning');
      });
    } else {
      if (mode == NHOM_NGACH) {
        this.listGroup.remove(this.itemDelete);
        this.spiceCurrent.group = this.listGroup.toArray();
        if (this.groupCurrent && this.groupCurrent._id == this.itemDelete._id) {
          this.groupCurrent = null;
          this.level.clear();
          this.listRank.clear();
        }
      } else if (mode == NGACH) {
        this.listRank.remove(this.itemDelete);
        this.groupCurrent.listRank = this.listRank.toArray();
      } else if (mode == BAC) {
        this.level.remove(this.itemDelete);
        this.groupCurrent.level = this.level.toArray();
      }
      this.taskService.put(Config.CATALOG_RANK_URL, {data: this.spiceCurrent}).subscribe(data => {
        super.updateMessge("Xóa thành công", 'success');
        setTimeout(() => {
          this.itemDelete = null;
        }, 1000);
        this.modDelete = null;
      }, err => {
        super.updateMessge("Xóa không thành công", 'warning');
      });
    }

  }
}

