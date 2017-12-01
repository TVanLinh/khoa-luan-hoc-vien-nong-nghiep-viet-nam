import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {ValidService} from "../../../shares/valid.service";
import {Config} from "../../../shares/config";
import {CatalogFacultyService} from "../../../shares/catalog-faculty.service";
import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";

@Component({
  selector: 'app-procedure-transfer-department',
  templateUrl: './procedure-transfer-department.component.html',
  styleUrls: ['../../form.css', './procedure-transfer-department.component.css']
})
export class ProcedureTransferDepartmentComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  formDetail: FormGroup;
  formTouch = false;
  user: any;
  listFaculty: CatalogFacultyModel[] = [];
  listLevel1: CatalogFacultyModel[] = [];
  listLevel2: CatalogFacultyModel[] = [];

  constructor(protected eleRef: ElementRef, taskService: TaskService, public  catalogFacService: CatalogFacultyService) {
    super(eleRef, taskService);
  }

  item = {
    personnelCode: "CB001",
    fullName: "Tran van linh",
    dateOfBirth: '18/08/1995',
    sex: 'Nam',
    position: ''
  };

  ngOnInit() {
    this.getCatalogFaculty();
    this.initForm();

  }

  initForm() {
    this.formDetail = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      dateTransfer: ['', Validators.required],
      numberDecide: ['', Validators.required],
      dateDecide: ['', Validators.required],
      contentDecide: ['', Validators.required],
      level1: ['', Validators.required],
      level2: ['', Validators.required]
    });
  }

  onProcess() {
    this.formTouch = true;

    let valueForm = this.formDetail.value;
    console.log(JSON.stringify(valueForm));

    let valid = [valueForm.numberDecide,
      valueForm.dateDecide,
      valueForm.contentDecide,
      valueForm.level1,
      valueForm.level2,
      valueForm.dateTransfer
    ];
    if (!ValidService.isNotBlanks(valid) || !this.formDetail.valid) {
      return;
    }

    let body = {
      numberDecide: valueForm.numberDecide,
      dateDecide: valueForm.dateDecide,
      contentDecide: valueForm.contentDecide,
      dateTransfer: valueForm.dateTransfer,
      user: this.user,
      // unitTransfer:{}
      unitTransfer: {
        level1: this.catalogFacService.findById(this.listFaculty, valueForm.level1),
        level2: this.catalogFacService.findById(this.listFaculty, valueForm.level2)
      }
    };
    //
    // if (this.catalogFacService.findById(this.listFaculty, valueForm.level1)) {
    //   body["unitTransfer"]['level1'] = this.catalogFacService.findById(this.listFaculty, valueForm.level1).name;
    // }
    //
    // if (valueForm.level2 && this.catalogFacService.findById(this.listFaculty, valueForm.level2)) {
    //   body["unitTransfer"]['level2'] = this.catalogFacService.findById(this.listFaculty, valueForm.level2).name;
    // }


    this.taskService.post(Config.LEAVE_DEPART_URL, {data: body}).subscribe((data) => {
      this.updateMessge("Thành công ", "success");
      setTimeout(() => {
        this.formDetail.reset();
        this.closeModal(this.modal);
      }, 2000);
    }, (err) => {
      this.updateMessge("Không thành công ", "warning");

    });

  }

  onChoiseHandler($event) {
    this.formTouch = false;
    let data = $event;
    this.user = $event;
    this.formDetail.patchValue({
      fullName: data.fullname,
      personnelCode: data.username
    });

    super.openModal(this.modal);
  }

  getCatalogFaculty() {
    this.catalogFacService.getList().subscribe((data: any[]) => {
      this.listFaculty = data;
      this.listLevel1 = this.catalogFacService.findByLevel(this.listFaculty, 1);
    }, err => {
      this.listFaculty = [];
      this.listLevel1 = [];
    });
  }


  level1Change(idParent) {
    console.log(idParent);
    this.listLevel2 = this.catalogFacService.findByIdParent(this.listFaculty, idParent);
  }


}
