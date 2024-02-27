import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

import { onPhoneValidate, onEmailValidate, onPasswordValidate, passwordMatchValidator } from '../validators/validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public error: string | null = null;
  

  registrationForm = this.formBuilder.group({
    name: ['',[Validators.required],],
  
    userName: [
      '', [Validators.required, Validators.maxLength(10)],],
    
    email: [
      '', [Validators.required, onEmailValidate()],],

    phone:['',{validators: [Validators.required, onPhoneValidate()]},],

    dialingCode: ['20'],

    password: ['',
      {
        validators: [Validators.required, onPasswordValidate],
      },
    ],
    confirmPassword: [
      '',
      {
        validators: [Validators.required],
      },

    
    ],

   
  }, 
      {validator: passwordMatchValidator}
  );

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



 


  public onRegistration() {
    console.log(this.registrationForm.value);

    const { email, password } = this.registrationForm.value;


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
