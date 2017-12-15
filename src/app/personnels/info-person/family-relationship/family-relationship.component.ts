import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {BaseFormComponent} from '../../base-form.component';
import {FormGroup, Validators} from '@angular/forms';
import * as Collections from 'typescript-collections';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {NationalService} from '../../../shares/national.service';
import {FamilyModel} from './family.model';
import {TaskService} from '../../../shares/task.service';
import {Config} from '../../../shares/config';
import {ValidService} from "../../../shares/valid.service";

declare const jQuery: any;

@Component({
  selector: 'app-family-relationship',
  templateUrl: './family-relationship.component.html',
  styleUrls: ['../../form.css', './family-relationship.component.css'],
})
export class FamilyRelationshipComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @ViewChild('modalFamily') modal: ModalComponent;
  formData: FormGroup;
  updateTemp: FamilyModel = null;
  formTouch = false;
  listRelationFamily = new Collections.LinkedList<FamilyModel>();

  constructor(public nationalService: NationalService,
              public taskService: TaskService,
              protected eleRef: ElementRef) {
    super(eleRef, taskService);
  }

  listYear: number[] = [];
  listRealtion: string[] = ['bố', 'mẹ', 'anh ', 'chị ', 'em ', 'ông ', 'bà', 'vợ',
    'chồng', 'con', 'chú', 'thím', 'bác', 'cậu', 'mợ', 'con dâu', 'con rể', 'chắt', 'khác'];

  initYear() {
    const date = new Date();
    for (let i = date.getFullYear(); i > 1899; i--) {
      this.listYear.push(i);
    }
  }

  dataForm: FamilyModel = {
    relation: 'bố',
    name: '',
    yearBirth: (new Date()).getFullYear(),
    job: ''
  };

  formNotValid = false;

  ngOnInit() {
    this.listRealtion = this.listRealtion.sort();
    this.initYear();
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      relation: [this.dataForm.relation, Validators.required],
      name: [this.dataForm.name, Validators.required],
      yearBirth: [this.dataForm.yearBirth, Validators.required],
      job: [this.dataForm.job, Validators.required]
    });
  }

  onSave() {
    const body = {
      'family': this.listRelationFamily.toArray(),
      'staffCode': this.user['username']
    };
    this.taskService.post(Config.FAMILY_URL, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, 'success');
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, 'warning');
    });

  }

  addItem() {
    this.formTouch = true;
    const valueForm = this.formData.value;

    let data = [valueForm.relation, valueForm.name, valueForm.job, valueForm.yearBirth];

    this.updateView("form-family", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      this.formNotValid = true;
      return;
    }

    this.formNotValid = false;


    if (this.updateTemp == null) {
      this.listRelationFamily.add(valueForm);
    } else {
      const indx = this.listRelationFamily.indexOf(this.updateTemp);
      this.listRelationFamily.remove(this.updateTemp);
      this.listRelationFamily.add(valueForm, indx);
    }

    this.updateTemp = null;

    this.resetForm();
    this.closeModal(this.modal);
  }

  resetForm() {
    this.formData.reset();
  }

  removeItem(item: FamilyModel) {
    this.listRelationFamily.remove(item);
  }

  editItem(item: FamilyModel) {
    this.updateValid("form-family");
    this.updateTemp = item;
    this.formData.setValue({
      relation: item.relation,
      name: item.name,
      yearBirth: item.yearBirth,
      job: item.job
    });

    this.openModal(this.modal);
  }

  getDataFromServer() {
    if (this.user) {
      this.taskService.get(Config.FAMILY_URL + '?username=' + this.user['username']).subscribe((data) => {
        if (data && data['family']) {
          this.listRelationFamily = this.asList(data['family']);
        }
      });
    }
  }

  openModals() {
    this.openModal(this.modal);
    this.formTouch = false;
  }

}


