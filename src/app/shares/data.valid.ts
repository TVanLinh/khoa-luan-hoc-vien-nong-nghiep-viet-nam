import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {Directive, Input} from "@angular/core";


@Directive({
  selector: '[text-validator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DataTextValid, multi: true}]
})

export class DataTextValid implements Validator {
  @Input() type: string;

  validate(control: AbstractControl): { [key: string]: any } {
    console.log("touched: " + control.touched + "dirty : " + control.dirty + " valid " + control.valid);
    let result = true;
    if ((this.type === 'text' || this.type === 'date' ) && control.value.toString().trim().length == 0 && (control.dirty || control.touched)) {
      result = false;
    }

    if (this.type === "select") {
      if ((control.value.toString().trim() === '0' || control.value.toString().trim() === '') && (control.dirty || control.touched)) {
        result = false;
      }
    }

    return {'valid': result};
  }
}
