import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../../shares/national.service";
import {ForeignLanguageModel} from "./foreign-language.model";
import {National} from "../../../model/national.model";
import {ForeignLanguageService} from "./foreign-language.service";
import * as Collections from "typescript-collections";
import {TaskService} from "../../../../shares/task.service";
import {Config} from "../../../../shares/config";

@Component({
  selector: 'app-foreign-language',
  templateUrl: './foreign-language.component.html',
  styleUrls: ['../../../form.css', './foreign-language.component.css'],
  providers: [ForeignLanguageService]
})
export class ForeignLanguageComponent extends BaseFormComponent implements OnInit {
  @ViewChild('languageModal') languageModal: ModalComponent;
  formData: FormGroup;

  positionUpdate = -1;
  update: ForeignLanguageModel = null;
  list = new Collections.LinkedList<ForeignLanguageModel>();


  constructor(public nationalService: NationalService,
              public foreignService: ForeignLanguageService,
              public  taskService: TaskService,
              protected eleRef: ElementRef) {
    super(eleRef);
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
      name: [this.initData.name],
      listen: [this.initData.listen],
      read: [this.initData.read],
      speak: [this.initData.speak],
      write: [this.initData.write],
      translate: [this.initData.translate],
      communicate: [this.initData.communicate],
      branch: [this.initData.branch]
    })
  }

  resetForm() {
    this.formData.patchValue({
      name: [''],
      listen: [1 + ""],
      read: [1],
      speak: [1],
      write: [1],
      translate: [1],
      communicate: [1],
      branch: ['']
    })
  }

  onSave() {
    let body = {
      "foreign_language": this.list.toArray(),
      "staffCode": this.acount['username']
    };
    console.log(Config.CONTRACT_FOREIGN);
    this.taskService.post(Config.CONTRACT_FOREIGN, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  addItem() {
    let valueForm = this.formData.value;

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
      listen: 1,
      read: 1,
      speak: 1,
      write: 1,
      translate: 1,
      communicate: 1,
      branch: ''
    });
  }

  removeItem(item: ForeignLanguageModel) {
    this.list.remove(item);
  }


  getDataFromServer() {
    this.taskService.get(Config.CONTRACT_FOREIGN + "?username=" + this.acount['username']).subscribe((data) => {
      if (data['foreign_language']) {
        this.list = this.asList(data['foreign_language']);
      }
    });
  }


}
