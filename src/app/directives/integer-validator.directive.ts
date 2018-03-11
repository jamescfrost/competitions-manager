import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[validateInteger]',
  providers: [{provide: NG_VALIDATORS, useExisting: IntegerValidatorDirective, multi: true}]
})
export class IntegerValidatorDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} {
    const isInteger = /^[-+]?\d+$/.test(control.value);
    const message = {
      'integer': {
        'message': 'Must be an integer'
      }
    };
    return isInteger ? null : message;
  }
}
