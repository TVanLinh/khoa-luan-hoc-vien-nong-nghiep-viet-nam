import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../../../shares/config";
import {ValidService} from "../../../../shares/valid.service";
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../../base-form.component";
import {TaskService} from "../../../../shares/task.service";
import * as Collections from "typescript-collections";

@Component({
  selector: 'app-arg-backend',
  templateUrl: './arg-backend.component.html',
  styleUrls: ['./arg-backend.component.css', '../../../form.css']
})
export class ArgBackendComponent extends BaseFormComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;

  formData: FormGroup;
  update = null;
  formTouch = false;
  list = new Collections.LinkedList<any>();
  methods = ['post', 'put', 'get', 'delete'];

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  openModal(modal, resetForm?: boolean) {
    super.openModal(this.modal);
    this.formTouch = false;
    if (!resetForm) {
      this.update = null;
      this.formData.reset();
    }
  }

  initForm() {
    this.formData = this.formBuilder.group({
      description: ['', Validators.required],
      httpVerb: ['', Validators.required],
      title: ['', Validators.required],
      controller: ['', Validators.required],
      method: ['', Validators.required],
      activated: ['', Validators.required]
    })
  }

  onSave() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    let valid = [valueForm.description.trim(),
      valueForm.httpVerb.trim(),
      valueForm.controller.trim(),
      valueForm.method.trim(),
      valueForm.activated];
    console.log(valueForm);
    if (!ValidService.isNotBlanks(valid) || !this.formData.valid) {
      return;
    }

    valueForm.httpVerb = valueForm.httpVerb.trim();
    valueForm.controller = valueForm.controller.trim();
    valueForm.method = valueForm.method.trim();

    if (this.update == null) {
      this.taskService.post(Config.BACKEND_URL, {'backend': valueForm}).subscribe(data => {
        console.log(data);
        setTimeout(() => {
          super.updateMessge("Lưu thành công", "success");
        }, 500);
        this.list.add(JSON.parse(data['_body']), 0);
      }, err => {
        setTimeout(() => {
          super.updateMessge("Lưu không thành công", "warning");
        }, 500);
      }, () => {
        super.closeModal(this.modal);
      });
    } else {
      valueForm['_id'] = this.update._id;
      this.taskService.put(Config.BACKEND_URL, {'backend': valueForm}).subscribe(data => {
        console.log(data);
        setTimeout(() => {
          super.updateMessge("Cập nhật thành công", "success");
        }, 500);
        super.updateList(this.list, this.update, valueForm);
      }, err => {
        setTimeout(() => {
          super.updateMessge("Cập nhật không thành công", "warning");
        }, 500);
      }, () => {
        super.closeModal(this.modal);
      });
    }

  }

  getDataFromServer() {
    this.taskService.get(Config.BACKEND_URL).subscribe(data => {
      this.list = super.asList(data);
    }, err => {
    });

  }

  removeItem(item) {
    this.taskService.delete2(Config.BACKEND_URL, {id: item._id}).subscribe(data => {
      this.list.remove(item);
      super.updateMessge("Xóa thành công", "success");
    }, err => {
      super.updateMessge("Xóa không thành công", "warning");
    });

  }

  editItem(item) {
    this.update = item;
    this.formData.patchValue({
      description: item.description,
      httpVerb: item.httpVerb,
      method: item.method,
      title: item.title,
      controller: item.controller,
      activated: item.activated
    });
    this.openModal(this.modal, true);
  }
}
