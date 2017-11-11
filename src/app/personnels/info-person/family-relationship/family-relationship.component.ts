import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NationalService} from "../../../shares/national.service";
import {FamilyModel} from "./family.model";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";

@Component({
  selector: 'app-family-relationship',
  templateUrl: './family-relationship.component.html',
  styleUrls: ['../../form.css', './family-relationship.component.css'],
})
export class FamilyRelationshipComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalFamily') modal: ModalComponent;
  formData: FormGroup;
  updateTemp: FamilyModel = null;

  listRelationFamily = new Collections.LinkedList<FamilyModel>();

  constructor(public nationalService: NationalService,
              private taskService: TaskService,
              protected eleRef: ElementRef) {
    super(eleRef);
  }

  listYear: number[] = [];
  listRealtion: string[] = ["bố", "mẹ", "anh ", "chị ", "em ", "ông ", "bà"];

  initYear() {
    let date = new Date();
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

  ngOnInit() {
    this.listRealtion = this.listRealtion.sort();
    this.initYear();
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      relation: [this.dataForm.relation],
      name: [this.dataForm.name],
      yearBirth: [this.dataForm.yearBirth],
      job: [this.dataForm.job]
    });
  }

  onSave() {

    let body = {
      "family": this.listRelationFamily.toArray(),
      "staffCode": this.acount['username']
    };
    this.taskService.post(Config.FAMILY_URL, {data: body}).subscribe((data) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  addItem() {
    let valueForm = this.formData.value;
    if (this.updateTemp == null) {
      this.listRelationFamily.add(valueForm);
    } else {
      let indx = this.listRelationFamily.indexOf(this.updateTemp);
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
    this.taskService.get(Config.FAMILY_URL + "?username=" + this.acount['username']).subscribe((data) => {
      if (data['family']) {
        this.listRelationFamily = this.asList(data['family']);
      }
    });
  }

}


