import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onPhoneValidate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numbersByUser = control.value;
    let regEx = /^[0-9]{7}$/g;

    if (regEx.test(numbersByUser)) {
      return null;
    } else {
      return { wrongNumber: true };
    }
  };
}

export function onEmailValidate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailByUser = control.value;
    let regEx = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/g;

    if (regEx.test(emailByUser)) {
      return null;
    } else {
      return { wrongEmailFormat: true };
    }
  };
}



