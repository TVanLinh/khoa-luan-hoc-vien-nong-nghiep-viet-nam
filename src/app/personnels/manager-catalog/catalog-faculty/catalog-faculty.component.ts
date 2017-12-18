import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {CatalogFacultyModel} from "./catalog-faculty.model";
import {FormGroup, NgForm, Validators} from "@angular/forms";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";

@Component({
  selector: 'app-catalog-faculty',
  templateUrl: './catalog-faculty.component.html',
  styleUrls: ['./catalog-faculty.component.css', "../../form.css"],
})
export class CatalogFacultyComponent extends BaseFormComponent implements OnInit {
  @ViewChild("modal") modal: ModalComponent;
  @ViewChild("modalDetail") modalDetail: ModalComponent;
  @ViewChild("modalNewDepart") modalNewDepart: ModalComponent;

  formData: FormGroup;
  // formNewDepart: FormGroup;

  positionUpdate = null;
  list = new Collections.LinkedList<CatalogFacultyModel>();
  listParent = new Collections.LinkedList<CatalogFacultyModel>();
  showParent = false;
  touched = false;
  details = new Collections.LinkedList<CatalogFacultyModel>();
  titleDetail: string = '';
  listTemp = new Collections.LinkedList<any>();
  numberShow = 10;

  constructor(protected eleRef: ElementRef,
              public taskService: TaskService,
              public  catalogFacService: CatalogFacultyService) {
    super(eleRef, taskService);
  }

  parent = null;
  newDepart = {
    name: '',
    code: '',
    parent: {
      code: ''
    }
  };

  levelFilter = 1;

  ngOnInit() {
    this.getCatalog();
    this.initForm();
  }

  changeLevel(level) {
    this.showParent = level == 2;
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      type: ['', Validators.required],
      code: ['', Validators.required],
      parent: ['', Validators.required],
      url: ['']
    });
  }

  validCode(code) {
    let pattern = /^[A-Za-z]{3}/g;
    return pattern.test(code);
  }


  onSave() {
    this.touched = true;
    let formValue = this.formData.value;

    //th tao mot phong ban cho mot khoa hoac cho don vi cap 1
    if ((this.details && this.details.size() > 0 && this.parent)) {
      // this.positionUpdate = null;
      formValue.name = this.newDepart.name;
      formValue.code = this.newDepart.code;
      formValue.parent = this.parent._id;
      formValue.level = '2';
    }

    let valid = [formValue.name, formValue.level, formValue.type, formValue.parent];
    if (!this.positionUpdate) {
      valid.push(formValue.code);
    }


    if (formValue.level == '2') {
      valid = [formValue.name, formValue.parent];
    }

    if (formValue.level == '1') {
      valid = [formValue.name, formValue.type];
    }

    console.log(formValue);
    if (!ValidService.isNotBlanks(valid)) {
      return;
    }


    // this.showParent = false;

    let body = new CatalogFacultyModel();
    body.name = formValue.name;
    body.level = formValue.level;
    body.type = formValue.type;
    body.url = formValue.url;
    body.code = formValue.code.toString().toLocaleUpperCase().trim();


    if (!this.validCode(body.code)) {
      return;
    }

    if (body.level == 1) {
      body.code = body.type == 'khoa' ? 'F' + body.code : 'D' + body.code;
    }

    let parent = new CatalogFacultyModel();
    if (formValue.parent && formValue.parent.id != '') {
      body.parent = parent;
      body.parent.id = formValue.parent;
    }


    if (this.positionUpdate == null) {
      if (body.level != 1) {
        body.type = null;
      }
      let data = {
        data: body
      };
      if (super.contains(this.list.toArray(), 'code', body.code)) {
        this.updateMessge("Mã " + body.code + " đã tồn tại ", "warning");
        return;
      }
      this.taskService.post(Config.CATATLOG_FACUTY_URL, data).subscribe((data) => {
        let response = JSON.parse(data['_body']);
        body['_id'] = response['_id'];
        // this.getCatalog();
        console.log(data);

        this.list.add(body);

        if (body.level == 1) {
          this.listParent.add(body, 0);
        }

        if (this.details) {
          this.details.add(body, 0);
        }

        this.closeModals();
        this.updateMessge("Lưu thành công ", "success");
      }, error => {
        console.log(error);
        this.closeModals();
        this.updateMessge("Lưu không thành công ", "warning");
      });

    } else {
      body._id = this.positionUpdate._id;
      if (body.level == 1) {
        body.parent = null;
      }
      let data = {
        data: body
      };

      let temp: Collections.LinkedList<any> = super.clone(this.list.toArray());

      temp.remove(this.positionUpdate);
      if (super.contains(temp.toArray(), 'code', body.code)) {
        this.updateMessge("Mã " + body.code + " đã tồn tại ", "warning");
        return;
      }

      this.taskService.put(Config.CATATLOG_FACUTY_URL, data).subscribe((data) => {
        // this.getCatalog();
        super.updateList(this.list, this.positionUpdate, body);
        super.updateList(this.listParent, this.positionUpdate, body);
        super.updateList(this.details, this.positionUpdate, body);

        this.closeModals();
        this.updateMessge("Cập nhật thành công ", "success");
      }, error => {
        console.log(error);
        this.closeModals();
        this.updateMessge("Cập nhật không thành công ", "warning");
      });
    }


  }

  closeModals() {
    super.closeModal(this.modalNewDepart);
    setTimeout(() => {
      this.closeModal(this.modal);
      this.touched = false;
      this.showParent = false;
    }, 2000)
  }

  getCatalog() {
    this.taskService.get(Config.CATATLOG_FACUTY_URL).subscribe((data: any[]) => {
      this.list = super.asList(data);
      this.listParent = super.asList(this.catalogFacService.findByLevel(this.list.toArray(), 1));
    });

  }

  removeItem(item) {
    this.taskService.delete(Config.CATATLOG_FACUTY_URL, ["id"], [item._id]).subscribe(() => {
      this.updateMessge("Xóa thành công ", "success");
      this.listParent.remove(item);
      this.list.remove(item);
      this.details.remove(item);
      if (item.level == 1) {
        setTimeout(() => {
          super.closeModal(this.modalDetail);
        }, 2000);
      }
    }, err => {
      this.updateMessge("Xóa không thành công ", "success");
    });
  }

  editItem(item) {
    this.positionUpdate = item;
    this.showParent = false;
    if (item.level == 1) {
      super.closeModal(this.modalDetail);
      this.touched = false;
      this.formData.patchValue({
        name: item.name,
        level: item.level,
        type: item.type,
        url: item.url,
        code: item.code.substring(1)
      });
      super.openModal(this.modal);
    } else if (item.level == 2) {
      this.newDepart.parent.code = '';
      this.newDepart.code = item.code;
      this.newDepart.name = item.name;
      super.openModal(this.modalNewDepart);
    }
  }

  openModals(number?: number) {

    this.positionUpdate = null;
    this.touched = false;
    if (!number) {
      super.openModal(this.modal);
      this.formData.reset();
      this.parent = null;
      this.details.clear();
    } else {
      this.newDepart = {
        name: '',
        code: '',
        parent: {
          code: ''
        }
      };
      super.openModal(this.modalNewDepart);

    }
  }

  viewDetail(item) {
    this.parent = item;
    if (item.type == 'khoa') {
      this.titleDetail = "Danh sách phòng ban của  khoa " + item.name;
    } else {
      this.titleDetail = "Danh sách phòng ban chi tiết của " + item.name;
    }
    this.newDepart.parent.code = item._id;
    this.details = super.asList(this.catalogFacService.findByIdParent(this.list.toArray(), item._id));
    super.openModal(this.modalDetail);
  }

  textChangeListener(event) {
    let str = event.trim();
    if (str == '') {
      this.listParent = super.asList(this.catalogFacService.findByLevel(this.list.toArray(), 1));
    } else {
      str = str.toLowerCase();
      let temp = [];
      this.listParent = super.asList(this.catalogFacService.findByLevel(this.list.toArray(), 1));
      for (let item of this.listParent.toArray()) {
        if (item.name.toLowerCase().indexOf(str) != -1 ||
          item.code.toLowerCase().indexOf(str) != -1 ||
          item.url.toLowerCase().indexOf(str) != -1) {
          temp.push(item);
        }
      }
      this.listParent.clear();
      this.listParent = super.asList(temp);
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
