import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ontelephoneValidate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const telephoneNumberByUser = control.value;

    let upper = /[0-9]{7}/g;

    if (upper.test(telephoneNumberByUser)) {
      return null;
    } else {
      return { isUpperCase: true };
    }
  };
}
