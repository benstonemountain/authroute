import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

import { onPhoneValidate, onEmailValidate } from '../validators/validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public error: string | null = null;
  

  registrationForm = this.formBuilder.group({
    name: ['',{validators: [Validators.required],},
    ],
    userName: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(50)],
      },
    ],
    email: [
      '',
      {
        validators: [Validators.required, onEmailValidate()],
      },
    ],
    phone:['',{validators: [Validators.required, onPhoneValidate()]},
    ],
    password: [
      '',
      {
        validators: [Validators.required, ],
      },
    ],
    confirmPassword: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
  
  ) {}

  get formControls () {return this.registrationForm.controls}

  
  
  // telefonszámhoz -, +, . és "e" is tiltott
  preventInvalidCharacters(event: KeyboardEvent) {
    const invalidCharacters = ['.', ',', '-', '+', 'e'];
    const inputByUser = event.key;

    if (invalidCharacters.includes(inputByUser)) {
      event.preventDefault();
    }
  }


  checkErrorsInPassword(passwordByUser: string | null | undefined ): string {

    let errorMessage = "";
   
    let upper = /[A-Z]/;
    let lower = /[a-z]/;
    let numbers = /[0-9]/;
    let length = /^.{8,32}$/;
   
    if(passwordByUser) {
    
    if(!numbers.test(passwordByUser)) {
      errorMessage = "A jelszónak tartalmaznia kell legalább egy számot.";
    } else if(!upper.test(passwordByUser)) {
      errorMessage = "A jelszónak tartalmaznia kell legalább egy nagybetűt.";
    } else if(!lower.test(passwordByUser)) {
      errorMessage = "A jelszónak tartalmaznia kell legalább egy kisbetűt.";
    }else if(!length.test(passwordByUser)) {
      errorMessage = "A jelszó minimum 8, maximum 32 karakter lehet.";
    } else {
      errorMessage = "";
    }
   
   } 
   return errorMessage;
   
   }


  public onRegistration() {
    console.log(this.registrationForm.value);

    const { email, password } = this.registrationForm.value;
    console.log(email);
    console.log(password);

    this.httpClient
      .post('http://localhost:3000/register', { email, password })
      .pipe(
        catchError((error) => {
          this.error = error.error;

          throw error;
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('/login');
        this.registrationForm.reset();
      });
  }
}
