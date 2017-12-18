import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import *as Collections from "typescript-collections";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {EmulationTitleModel} from "./emulation-title.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-emulation-title',
  templateUrl: './emulation-title.component.html',
  styleUrls: ['../../form.css', './emulation-title.component.css']
})
export class EmulationTitleComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @ViewChild('emulationTitle') emulationTitle: ModalComponent;
  formData: FormGroup;
  listEmulation = new Collections.LinkedList<EmulationTitleModel>();
  positionUpdate: EmulationTitleModel = null;

  initData: EmulationTitleModel = {
    title: "",
    dateLicense: new Date,
    numberDecide: ""
  };

  formNotValid = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getDataFromServer();
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      title: [this.initData.title, Validators.required],
      dateLicense: [this.initData.dateLicense, Validators.required],
      numberDecide: [this.initData.numberDecide, Validators.required]
    })
  }

  removeItem(index: number) {
    this.listEmulation.removeElementAtIndex(index);
  }

  onSave() {
    //if (this.listEmulation.size() > 0) {
    this.pushDataServer(Config.EMULATION_TITLE_URL, "emulation_title", this.listEmulation, this.user);
    // }

  }

  openModals() {
    this.positionUpdate = null;
    this.formData.reset();
    super.openModal(this.emulationTitle);
  }

  addItem() {
    let valueForm = this.formData.value;
    let data: any = [valueForm.title, valueForm.dateLicense, valueForm.numberDecide];

    this.updateView("emulation-title", this.formData.valid);

    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.formNotValid = false;
    //-----------------------
    if (this.positionUpdate == null) {
      this.listEmulation.add(valueForm);
    } else {
      super.updateList(this.listEmulation, this.positionUpdate, valueForm);
    }
    this.positionUpdate = null;
    super.closeModal(this.emulationTitle);
  }

  editItem(item) {
    this.updateValid("emulation-title");
    this.positionUpdate = item;
    this.formData.setValue({
      title: item.title,
      dateLicense: item.dateLicense,
      numberDecide: item.numberDecide
    });
    super.openModal(this.emulationTitle);
  }

  getDataFromServer() {
    this.getDataServer(Config.EMULATION_TITLE_URL,this.user).subscribe((data: any[]) => {
      if (data && data['emulation_title']) {
        this.listEmulation = super.asList(data['emulation_title']);
      }
    });
  }

  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }
}
