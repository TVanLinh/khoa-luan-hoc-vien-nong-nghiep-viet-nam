import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";
import {FormGroup} from "@angular/forms";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-process-work',
  templateUrl: './process-work.component.html',
  styleUrls: ['../../form.css', './process-work.component.css']
})
export class ProcessWorkComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  formData: FormGroup;
  formInfoProcess: FormGroup;
  positionUpdate = -1;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
  }

  ngOnInit() {
    this.innitForm();
  }


  innitForm() {
    // this.formData = this.formBuilder.group({
    //   objectPersonnel: [''],
    //   branch: [''],//nganh
    //   species: [''],//loai
    //   isTeaching: [''],// dang giang day
    //   department: [''],
    //   dateInPayroll: [''],//ngay vao bien che
    //   dateInHV: [''],//ngay vao hoc vien
    //   yearInEducation: [''],//ngay vao nghanh giao duc
    //   dateInLeve1: ['']//ngay vao don vi cap 1
    // });

    this.formInfoProcess = this.formBuilder.group({
      isNotBelogtoHV: [true],
      level1: [''],
      level2: [''],
      concurrently: [false],// kiem nhiem
      dateFrom: [(new Date)],
      // isDateInPayroll: [false],
      // isDateInHV: [false],
      // isYearInEducation: [false],
      // isDateInLeve1: [false],
      dateEnd: [(new Date)],
      position: [''],
      job: ['']
    });
  }

  onSave() {
    let valueForm = this.formData.value;
    console.log(valueForm);
  }

  addItem() {
    console.log(this.formInfoProcess.value);

    this.positionUpdate = -1;

    this.closeModal(this.modal);
  }

  editItem(index: number) {
    this.positionUpdate = index;


    this.openModal(this.modal);
  }

  removeItem(index: number) {

  }
}
