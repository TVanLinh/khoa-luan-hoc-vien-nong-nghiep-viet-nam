import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import * as Collections from "typescript-collections";
import {AddressModel} from "../../model/address.model";
import {Config} from "../../../shares/config";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Util} from "../../../shares/util";


const TINH = "TINH";
const HUYEN = "HUYEN";
const XA = "XA";

@Component({
  selector: 'app-manager-geography',
  templateUrl: './manager-geography.component.html',
  styleUrls: ['../../form.css', "../manager-catalog.component.css", './manager-geography.component.css']
})


export class ManagerGeographyComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalDistrict') modalDistrict: ModalComponent;
  @ViewChild('modalGuild') modalGuild: ModalComponent;
  @ViewChild('modalCreate') modalCreate: ModalComponent;


  listAddress = new Collections.LinkedList<any>();
  cityCurrent = null;
  districtCurrent = null;
  listDistrict = new Collections.LinkedList<any>();
  listGuild = new Collections.LinkedList<any>();
  numberCityShow = 10;
  numberDistrictShow = 10;
  positionUpdate = null;
  inputData = '';

  formData = {
    title: '',
    label: '',
    type: '',
    msg: ''
  };


  pipe = {
    city: '',
    district: '',
    guild: ''
  };


  constructor(protected eleRef: ElementRef,
              public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.taskService.get(Config.CATALOG_ADDRESS_URL).subscribe(data => {
      this.listAddress = super.asList(data);
    });
  }

  viewDetailCity(item: AddressModel) {
    this.cityCurrent = item;
    this.listDistrict = super.asList(this.cityCurrent.city.districts);
    super.openModal(this.modalDistrict);
  }

  viewDetailDistrict(item) {
    this.districtCurrent = item;
    this.listGuild = super.asList(this.districtCurrent.guids);
    super.openModal(this.modalGuild);
  }

  openModals(type) {
    this.getModelCreate(type);
    this.formData.msg = '';
    this.inputData = '';
    this.positionUpdate = null;
    super.openModal(this.modalCreate);
  }

  getModelCreate(type) {
    this.formData.type = type;
    if (type == TINH) {
      this.formData.label = "Tên tỉnh/thành phố";
      if (this.positionUpdate) {
        this.formData.title = 'Cập nhật tỉnh';
      } else {
        this.formData.title = 'Thêm tỉnh/thành phố';
      }

    } else if (type == HUYEN) {
      this.formData.label = "Tên quận/huyện";
      if (this.positionUpdate) {
        this.formData.title = 'Cập nhật quận/huyện';
      } else {
        this.formData.title = 'Thêm quận/huyện';
      }
    } else if (type == XA) {
      this.formData.label = "Tên xã/phường";
      if (this.positionUpdate) {
        this.formData.title = 'Cập nhật xã/phường';
      } else {
        this.formData.title = 'Thêm xã/phường';
      }
    }

  }

  onSave2() {
    this.inputData = this.inputData.trim();
    if (this.inputData == '') {
      this.formData.msg = 'Chưa nhập ' + this.formData.label.toLowerCase();
      return;
    }
  }

  editItem(item, type) {
    if (type == TINH) {
      this.cityCurrent = item;
      this.inputData = item.city.name;
    } else {
      this.inputData = item.name;
    }

    this.getModelCreate(type);

    this.positionUpdate = item;

    this.formData.msg = '';

    super.openModal(this.modalCreate);
  }

  onSave() {
    this.inputData = this.inputData.trim();
    if (this.inputData == '') {
      this.formData.msg = 'Chưa nhập ' + this.formData.label.toLowerCase();
      return;
    }


    if (this.positionUpdate) {
      let body = JSON.parse((JSON.stringify(this.positionUpdate)));

      if (this.formData.type == TINH) {

        if (this.hashCity(this.listAddress.toArray(), this.inputData)) {
          this.formData.msg = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }

        body.city.name = this.inputData;
        super.updateList(this.listAddress, this.positionUpdate, body);
        this.cityCurrent.city.name = this.inputData;

      } else if (this.formData.type == HUYEN) {
        if (Util.contains(this.listDistrict.toArray(), 'name', this.inputData)) {
          this.formData.msg = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }

        body.name = this.inputData;
        // this.districtCurrent.name = this.inputData;
        super.updateList(this.listDistrict, this.positionUpdate, body);

      } else if (this.formData.type == XA) {
        if (Util.contains(this.listGuild.toArray(), 'name', this.inputData)) {
          this.formData.msg = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }

        body.name = this.inputData;
        super.updateList(this.listGuild, this.positionUpdate, body);
        this.districtCurrent.guids = this.listGuild.toArray();
      }

      this.formData.msg = '';

      this.taskService.put(Config.CATALOG_ADDRESS_URL, {data: this.cityCurrent}).subscribe(data => {
        super.updateMessge("Cập nhật thành công", "success");
      }, err => {
        super.updateMessge("Cập nhật không thành công", "warning");
      });

    } else {
      if (this.formData.type == TINH) {
        let body = {city: {name: this.inputData, code: 0}};

        if (this.hashCity(this.listAddress.toArray(), this.inputData)) {
          this.formData.msg = "Tên này đã tồn tại, vui lòng nhập lại";
          return;
        }
        body['city']['code'] = this.getCodeMax(this.listAddress.toArray()) + 1;

        this.taskService.post(Config.CATALOG_ADDRESS_URL, {data: body}).subscribe(data => {
          let result = JSON.parse(data['_body']);
          if (result['msg']) {
            console.log("hash msg");
            super.updateMessge("Không thành công, loại ngạch này đã tồn tại", "warning");
          } else {
            body["_id"] = result['_id'];
            super.updateMessge("Thêm thành công", "success");
            this.listAddress.add(body, 0);
          }
        }, err => {
          super.updateMessge("Thêm không thành công", "warning");
        });

      } else {
        if (this.formData.type == HUYEN) {
          if (Util.contains(this.listDistrict.toArray(), 'name', this.inputData)) {
            this.formData.msg = "Tên này đã tồn tại, vui lòng nhập lại";
            return;
          }

          if (!this.cityCurrent.city.districts) {
            this.cityCurrent.city.districts = [];
          }

          let body = {code: 0, name: this.inputData};

          // this.cityCurrent.districts.push(body);

          body.code = this.getCodeMax(this.listDistrict.toArray()) + 1;

          this.listDistrict.add(body, 0);

          this.cityCurrent.city.districts = this.listDistrict.toArray();

        } else if (this.formData.type == XA) {
          if (Util.contains(this.listGuild.toArray(), 'name', this.inputData)) {
            this.formData.msg = "Tên này đã tồn tại, vui lòng nhập lại";
            return;
          }

          let body = {code: 0, name: this.inputData};

          body.code = this.getCodeMax(this.listGuild.toArray()) + 1;

          if (!this.districtCurrent.guids) {
            this.districtCurrent.guids = [];
          }

          this.listGuild.add(body, 0);

          this.districtCurrent.guids = this.listGuild.toArray();
        }

        this.formData.msg = '';
        this.taskService.put(Config.CATALOG_ADDRESS_URL, {data: this.cityCurrent}).subscribe(data => {
          super.updateMessge("Thêm thành công", "success");
        }, err => {
          super.updateMessge("Thêm không thành công", "warning");
        });
      }

    }
  }

  hashCity(list: any[], name: string) {
    for (let item of list) {
      if (item.city.name.trim().toLowerCase() == name.trim().toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  getCodeMax(list: any[]) {
    let max = 0;
    for (let item of list) {
      if (item.city) {
        if (item.city.code > max) {
          max = item.city.code;
        }
      } else {
        if (item.code > max) {
          max = item.code;
        }
      }
    }
    return max;
  }


  removeItem(mode) {
    if (mode == TINH) {
      this.taskService.delete2(Config.CATALOG_ADDRESS_URL, {id: this.itemDelete._id}).subscribe(data => {
        this.listAddress.remove(this.itemDelete);
        if (this.cityCurrent && this.cityCurrent._id == this.itemDelete._id) {
          this.cityCurrent = null;
          this.districtCurrent = null;
          this.listDistrict.clear();
          this.listGuild.clear();
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
      if (mode == HUYEN) {
        this.listDistrict.remove(this.itemDelete);
        this.cityCurrent.city.districts = this.listDistrict.toArray();
        if (this.districtCurrent && this.districtCurrent._id == this.itemDelete._id) {
          this.districtCurrent = null;
          this.listGuild.clear();
        }
      } else if (mode == XA) {
        this.listGuild.remove(this.itemDelete);
        this.districtCurrent.guids = this.listGuild.toArray();
      }
      this.taskService.put(Config.CATALOG_ADDRESS_URL, {data: this.cityCurrent}).subscribe(data => {
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

  modDelete = null;
  itemDelete = null;

  confirm(answer) {
    console.log(JSON.stringify(this.itemDelete) + " mode " + this.modDelete);
    if (answer) {
      this.removeItem(this.modDelete);
    }
  }

}
