import {Component, OnInit, ViewChild, ElementRef, Input} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup, Validators} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {TaskService} from "../../../shares/task.service";
import {ForeignModel} from "./foreign.model";
import {National} from "../../model/national.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-foreign',
  templateUrl: './foreign.component.html',
  styleUrls: ['../../form.css', './foreign.component.css']
})


export class ForeignComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @ViewChild('modal') modal: ModalComponent;
  @Input() editEnable = true;
  formData: FormGroup;
  listForeignForm = new Collections.LinkedList<ForeignModel>();
  positionUpdate: ForeignModel = null;

  nationals: National[] = [];

  constructor(public nationalService: NationalService,
              public taskService: TaskService,
              protected eleRef: ElementRef) {
    super(eleRef, taskService);
  }

  formNotValid = false;
  formTouch = false;
  hashData = false;

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
    this.initNations();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateEnd: ['', Validators.required],
      national: ['', Validators.required],
      product: [''],
      purpose: ['', Validators.required],
    });
  }

  onSave() {
    if (this.listForeignForm.toArray().length == 0 && !this.hashData) {
      super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
      return;
    }
    super.pushDataServer(Config.PROCESS_FOREIGN_URL, "process_foreign", this.listForeignForm, this.user);
  }


  openModals() {
    super.openModal(this.modal);
    this.formData.reset();
    this.positionUpdate = null;
    this.formTouch = false;
  }

  addItem() {
    this.formTouch = true;
    let valueForm = this.formData.value;

    let data: any[] = [valueForm.dateFrom, valueForm.dateEnd, valueForm.national, valueForm.purpose];

    this.updateView("foreign-form", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    if (this.compareDate(valueForm.dateFrom, valueForm.dateEnd) >= 0) {
      return;
    }

    this.formNotValid = false;

    //-----------------------------------------
    if (this.positionUpdate == null) {
      this.listForeignForm.add(valueForm);
    } else {
      super.updateList(this.listForeignForm, this.positionUpdate, valueForm);
    }

    this.closeModal(this.modal);
    setTimeout(() => {
      this.positionUpdate = null;
      this.resetForm();
    }, 500);
  }

  resetForm() {
    this.formData.patchValue({
      dateFrom: new Date(),
      dateEnd: new Date(),
      national: '',
      product: '',
      purpose: ''
    })
  }

  removeItem(index: number) {
    this.listForeignForm.removeElementAtIndex(index);
  }

  editItem(item) {
    this.updateValid("foreign-form");
    this.formData.setValue({
      dateFrom: item.dateFrom,
      dateEnd: item.dateEnd,
      national: item.national,
      product: item.product,
      purpose: item.purpose,
    });
    this.positionUpdate = item;
    this.openModal(this.modal);
  }

  initNations() {
    this.nationalService.getData().subscribe((data: National[]) => {
      this.nationals = data;
    })
  }

  getDataFromServer() {
    if (this.user) {
      super.getDataServer(Config.PROCESS_FOREIGN_URL, this.user).subscribe(data => {
        if (data && data['process_foreign']) {
          this.listForeignForm = super.asList(data['process_foreign']);
          this.hashData = true;
        }
      });

    }
  }

  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }
}
