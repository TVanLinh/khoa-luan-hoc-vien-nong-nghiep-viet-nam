import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskService} from "../shares/task.service";

export class BaseFormComponent {
  protected formBuilder: FormBuilder = null;
  constructor() {
    if (this.formBuilder == null) {
      this.formBuilder = new FormBuilder();
    }

  }

  protected resetForm(target: FormGroup) {
    target.reset();
  }

  //----------------
  openModal(target: any) {
    target.open();
    // this.modalComponent.open();
  }

  closeModal(target: any) {
    target.close();
  }

}
