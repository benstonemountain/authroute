import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

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

export function onEmailValidate(): ValidatorFn | string{
  return (control: AbstractControl): ValidationErrors | null   => {
    const emailByUser = control.value;
   

    let regEx = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/g;


    if(regEx.test(emailByUser)) {
      return null;
    } else {
      return { wrongEmailFormat: true };
    }



  };
}

export function onPasswordValidate(control: AbstractControl): ValidationErrors| null{
  const passwordByUser = control.value
  let errorMessage = "";
    
  let upper = /[A-Z]/;
  let lower = /[a-z]/;
  let numbers = /[0-9]/;
  let length = /^.{8,16}$/;

  if(!passwordByUser) return null

  if(!numbers.test(passwordByUser)) {
    errorMessage = "A jelszónak tartalmaznia kell legalább egy számot.";
  } else if(!upper.test(passwordByUser)) {
    errorMessage = "A jelszónak tartalmaznia kell legalább egy nagybetűt.";
  } else if(!lower.test(passwordByUser)) {
    errorMessage = "A jelszónak tartalmaznia kell legalább egy kisbetűt.";
  }else if(!length.test(passwordByUser)) {
    errorMessage = "A jelszó minimum 8, maximum 16 karakter lehet.";
  }

  return errorMessage ? {passwordError: true, errorMessage} : null;
  
}

export function passwordMatchValidator(formGroup: AbstractControl): ValidatorFn {

 return (control: AbstractControl): ValidationErrors | null => {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = control.value;

  if(!passwordControl || !confirmPasswordControl) return null;


  if (passwordControl.value !== confirmPasswordControl) {
    return { passwordMismatch: true };
  } else {
    return null;
  }
 }}