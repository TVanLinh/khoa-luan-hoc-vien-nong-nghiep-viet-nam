import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {ValidService} from "../../../shares/valid.service";

@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['../../form.css', './procedure-form.component.css']
})
export class ProcedureFormComponent extends BaseFormComponent implements OnInit, OnChanges {

  @ViewChild('modal') modal: ModalComponent;
  @Output() onProcess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() textChange: EventEmitter<any> = new EventEmitter<any>();
  formData: FormGroup;
  formTouch = false;
  @Input() user: any;
  @Input() datas: any[];
  @Input() values: any;
  @Input() title: string = '';
  dateDecideNow = new Date();
  positionUpdate = null;
  itemDelete = null;
  numberShow = 10;
  private dataTemp;


  constructor(protected eleRef: ElementRef, taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changes");
    if (!this.dataTemp) {
      this.dataTemp = super.clone(this.datas).toArray();
    }
  }

  initForm() {
    this.formData = this.formBuilder.group({
      numberDecide: ['', Validators.required],
      dateDecide: [new Date(), Validators.required],
      contentDecide: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.initForm();
  }

  onProcessShare() {
    this.formTouch = true;

    let valueForm = this.formData.value;
    let valid = [valueForm.numberDecide, valueForm.dateDecide, valueForm.contentDecide];
    if (!ValidService.isNotBlanks(valid) || !this.formData.valid) {
      return;
    }

    let body = {
      numberDecide: valueForm.numberDecide,
      dateDecide: valueForm.dateDecide,
      contentDecide: valueForm.contentDecide,
      user: this.user
    };

    if (this.positionUpdate) {
      body["_id"] = this.positionUpdate._id;
    }
    this.onProcess.emit(body);
  }

  open(user?: any) {
    this.user = user;
    this.positionUpdate = null;
    super.openModal(this.modal);
  }

  //
  close() {
    super.closeModal(this.modal);
    this.formData.reset();
    this.formTouch = false;
    // this.user = null;
  }

  setValue(values) {
    this.values = values;
    this.dateDecideNow = values.dateDecide;
    this.formData.patchValue({
      numberDecide: this.values.numberDecide,
      contentDecide: this.values.contentDecide,
    });
  }


  editItem(item) {
    this.positionUpdate = item;
    this.setValue(item);
    this.user = item.user;
    this.onEdit.emit(item);
  }


  confirm(answer) {
    if (answer) {
      this.onRemove.emit(this.itemDelete);
    }
  }

  textChangeListener(event) {
    this.textChange.emit(event);
  }

  numberViewChangeListener(query) {
    this.numberShow = query;
  }

}
