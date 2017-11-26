/** A hero's name can't match the given regular expression */
import {AbstractControl, ValidatorFn} from "@angular/forms";

export class DataValid {
  static textValid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = control.value != null && control.value.trim() != '';
      console.log("forbidden "+forbidden);
      return forbidden ? {'textValid': {value: control.value}} : null;
    };
  }
}
