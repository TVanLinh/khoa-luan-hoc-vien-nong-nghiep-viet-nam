import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../../shares/national.service";
import {ForeignLanguageModel} from "./foreign-language.model";
import {National} from "../../../model/national.model";
import {ForeignLanguageService} from "./foreign-language.service";
import * as Collections from "typescript-collections";
import {TaskService} from "../../../../shares/task.service";
import {Config} from "../../../../shares/config";
import {ValidService} from "../../../../shares/valid.service";

@Component({
  selector: 'app-foreign-language',
  templateUrl: './foreign-language.component.html',
  styleUrls: ['../../../form.css', './foreign-language.component.css'],
  providers: [ForeignLanguageService]
})
export class ForeignLanguageComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @Input() editEnable = true;
  @ViewChild('languageModal') languageModal: ModalComponent;
  formData: FormGroup;

  positionUpdate = -1;
  update: ForeignLanguageModel = null;
  list = new Collections.LinkedList<ForeignLanguageModel>();
  formTouch = false;
  hashData = false;

  constructor(public nationalService: NationalService,
              public foreignService: ForeignLanguageService,
              public  taskService: TaskService,
              protected eleRef: ElementRef) {
    super(eleRef, taskService);
  }

  levels = [0, 1, 2, 3, 4];


  nationals: National[] = [];

  initData: ForeignLanguageModel = {
    name: "en",
    listen: 1,
    read: 1,
    speak: 1,
    write: 1,
    translate: 1,
    communicate: 1,
    branch: ""
  };
  formNotValid = false;

  ngOnInit() {
    this.initNationals();
    this.initForm();
    this.getDataFromServer();
  }

  initNationals() {
    this.nationalService.getData().subscribe(data => {
      this.nationals = data;
    });
  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: [this.initData.name, Validators.required],
      listen: [this.initData.listen, Validators.required],
      read: [this.initData.read, Validators.required],
      speak: [this.initData.speak, Validators.required],
      write: [this.initData.write, Validators.required],
      translate: [this.initData.translate, Validators.required],
      communicate: [this.initData.communicate, Validators.required],
      branch: [this.initData.branch]
    })
  }

  resetForm() {
    this.formData.patchValue({
      name: [''],
      listen: [""],
      read: [''],
      speak: [''],
      write: [''],
      translate: [''],
      communicate: [''],
      branch: ['']
    })
  }

  onSave() {
    if (this.list.toArray().length == 0 && !this.hashData) {
      super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận", "warning");
      return;
    }

    let body = {
      "foreign_language": this.list.toArray(),
      "staffCode": this.user['username']
    };
    this.taskService.post(Config.CONTRACT_FOREIGN, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  addItem() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    console.log(valueForm);
    let data: any[] = [valueForm.name, valueForm.listen, valueForm.read,
      valueForm.write, valueForm.speak,
      valueForm.translate, valueForm.communicate];

    this.updateView("language-info", this.formData.valid);


    if (!ValidService.isNotBlanks(data) || !this.formData.valid) {
      this.formNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.formNotValid = false;
    //----------------------
    if (this.update == null) {
      console.log(valueForm);
      this.list.add(valueForm);
    } else {
      let idex = this.list.indexOf(this.update);
      console.log("idx " + idex);
      this.list.removeElementAtIndex(idex);
      this.list.add(valueForm, idex);
    }

    this.closeModal(this.languageModal);
    this.update = null;
  }

  editItem(item: ForeignLanguageModel) {
    this.updateValid("language-info");

    this.update = item;
    this.formData.setValue({
      name: this.update.name,
      listen: this.update.listen,
      read: this.update.read,
      speak: this.update.speak,
      write: this.update.write,
      translate: this.update.translate,
      communicate: this.update.communicate,
      branch: this.update.branch
    });
    this.openModal(this.languageModal);
  }

  openModalNew() {
    this.openModal(this.languageModal);
    this.formData.setValue({
      name: 'vi',
      listen: '',
      read: "",
      speak: "",
      write: "",
      translate: "",
      communicate: "",
      branch: ''
    });
    this.formTouch = false;
  }

  removeItem(item: ForeignLanguageModel) {
    this.list.remove(item);
  }


  getDataFromServer() {
    if (this.user) {
      this.taskService.get(Config.CONTRACT_FOREIGN + "?username=" + this.user['username']).subscribe((data) => {
        if (data && data['foreign_language']) {
          this.list = this.asList(data['foreign_language']);
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
