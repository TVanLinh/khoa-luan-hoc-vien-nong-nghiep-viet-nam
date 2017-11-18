import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";

@Component({
  selector: 'app-procedure-leave-job',
  templateUrl: './procedure-leave-job.component.html',
  styleUrls: ['../../form.css', './procedure-leave-job.component.css']
})
export class ProcedureLeaveJobComponent extends BaseFormComponent implements OnInit {
  @ViewChild('modalLeaveJob') modalLeaveJob: ModalComponent;
  formSearch: FormGroup;
  formLeaveJob: FormGroup;

  constructor(protected eleRef: ElementRef, taskService: TaskService) {
    super(eleRef,taskService);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formSearch = this.formBuilder.group({
      department: [''],
      nameOrCodePersonnel: ['']
    });
    this.formLeaveJob = this.formBuilder.group({
      fullName: [''],
      personnelCode: [''],
      numberDecide: [''],
      dateDecide: [''],
      contentDecide: ['']
    })
  }

  onSearch() {
    console.log(this.formSearch.value);
  }

  onProcess() {

  }
}
