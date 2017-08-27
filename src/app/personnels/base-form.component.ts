import {FormBuilder, FormGroup} from "@angular/forms";
export class BaseFormComponent {
  protected formBuilder: FormBuilder;

  constructor() {
    this.formBuilder = new FormBuilder();
  }

  protected  resetForm(target: FormGroup) {
    target.reset();
  }

}
