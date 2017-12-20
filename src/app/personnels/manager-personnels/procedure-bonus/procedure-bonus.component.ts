import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";
import * as Collections from 'typescript-collections';

@Component({
  selector: 'app-procedure-bonus',
  templateUrl: './procedure-bonus.component.html',
  styleUrls: ['./procedure-bonus.component.css', '../../form.css']
})
export class ProcedureBonusComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalBonus') modalBonus: ModalComponent;

  formData: FormGroup;
  formTouch = false;
  user;
  initFormData = {dateDecide: new Date()};
  positionUpdate = null;
  listBonus = new Collections.LinkedList();

  @Input() url = Config.BONUS_URL;
  @Input() name = 'bonus';
  @Input() title = 'Làm thủ tục khen thưởng ';

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }


  ngOnInit() {
    this.initForm();
  }

  onChoiseHandler($event) {
    this.formTouch = false;
    let data = $event;
    this.user = $event;
    this.formData.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });
    this.getDataFromServer();
    super.openModal(this.modalBonus);
  }

  initForm() {
    this.formData = this.formBuilder.group({
      rankDecide: ['', Validators.required],
      form: ['', Validators.required],
      numberDecide: ['', Validators.required],
      dateDecide: [this.initFormData.dateDecide, Validators.required],
      reason: ['', Validators.required]
    })
  }

  onSave() {
    this.formTouch = true;
    let valueForm = this.formData.value;
    //  console.log(valueForm);
    let valid = [valueForm.rankDecide,
      valueForm.form,
      valueForm.numberDecide,
      valueForm.dateDecide,
      valueForm.reason
    ];

    if (!ValidService.isNotBlanks(valid) || !this.formData.valid) {
      console.log("error");
      return;
    }

    let body = {
      "staffCode": this.user['username']
    };

    let temp = new Collections.LinkedList();

    for (let i of this.listBonus.toArray()) {
      temp.add(i);
    }
    if (this.positionUpdate) {
      temp = super.updateList(temp, this.positionUpdate, valueForm);
    } else {
      temp.add(valueForm);
    }

    body[this.name] = temp.toArray();

    this.taskService.post(this.url, {data: body}).subscribe((resp) => {
      super.updateMessge("Thành công ", 'success');
      if (this.positionUpdate) {
        super.updateList(this.listBonus, this.positionUpdate, valueForm);
      } else {
        this.listBonus.add(valueForm);
      }
      this.formData.reset();
      this.positionUpdate = null;
      this.formTouch = false;
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }


  editItem(item) {
    this.positionUpdate = item;


    this.formData.reset();
    this.formTouch = false;

    if (item.dateEnd) {
      this.formData.patchValue({});
    }
    this.formData.patchValue({
      rankDecide: item.rankDecide,
      form: item.form ? item.form : '',
      numberDecide: item.numberDecide,
      dateDecide: item.dateDecide,
      reason: item.reason
    });
    super.openModal(this.modalBonus);
  }

  removeItem(item) {
    let body = {
      "staffCode": this.user['username']
    };

    this.listBonus.remove(item);

    body[this.name] = this.listBonus.toArray();
    this.taskService.post(this.url, {data: body}).subscribe((resp) => {
      super.updateMessge("Thành công ", 'success');
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }


  getDataFromServer() {
    super.getDataServer2(this.url, this.user['username']).subscribe((data: any[]) => {
      if (data && data[this.name]) {
        this.listBonus = super.asList(data[this.name]);
      }
    }, () => {

    });
  }

  itemDelete = null;

  confirm(answer) {
    if (answer) {
      this.removeItem(this.itemDelete);
    }
  }

}
