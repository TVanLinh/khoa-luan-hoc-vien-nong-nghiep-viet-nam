import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../../base-form.component";
import {TaskService} from "../../../../shares/task.service";
import {FormGroup, Validators} from "@angular/forms";
import {ValidService} from "../../../../shares/valid.service";
import {Config} from "../../../../shares/config";
import * as Collections from "typescript-collections";

@Component({
  selector: 'app-arg-fontend',
  templateUrl: './arg-fontend.component.html',
  styleUrls: ['./arg-fontend.component.css', '../../../form.css']
})
export class ArgFontendComponent extends BaseFormComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;

  formData: FormGroup;
  update = null;
  formTouch = false;
  list = new Collections.LinkedList<any>();

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
      url: ['', Validators.required],
      title: ['', Validators.required],
      activated: ['', Validators.required]
    })
  }

  onSave() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    let valid = [valueForm.description.trim(),
      valueForm.url.trim(),
      valueForm.title.trim(),
      valueForm.activated];

    if (!ValidService.isNotBlanks(valid) || !this.formData.valid) {
      return;
    }

    valueForm.url = valueForm.url.trim();
    valueForm.title = valueForm.title.trim();

    if (this.update == null) {
      this.taskService.post(Config.FONTEND_URL, {'frontend': valueForm}).subscribe(data => {
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
      this.taskService.put(Config.FONTEND_URL, {'frontend': valueForm}).subscribe(data => {
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
    this.taskService.get(Config.FONTEND_URL).subscribe(data => {
      this.list = super.asList(data);
    }, err => {
    });

  }

  removeItem(item) {
    this.taskService.delete2(Config.FONTEND_URL, {id: item._id}).subscribe(data => {
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
      url: item.url,
      title: item.title,
      activated: item.activated
    });
    this.openModal(this.modal, true);
  }

}
