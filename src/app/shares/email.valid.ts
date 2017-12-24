import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {Directive} from "@angular/core";

// @Directive({
//   selector: '[email-validator]',
//   providers: [{provide: NG_VALIDATORS, useExisting: EmailValid, multi: true}]
// })

export class EmailValid implements Validator {
  // @Input() type: string;

  validate(control: AbstractControl): { [key: string]: any } {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const forbidden = re.test(control.value);
    return {'emailValid': forbidden};
  }
}
