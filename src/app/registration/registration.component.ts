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
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    userName: [
      '',
      {
        validators: [Validators.required],
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
        validators: [Validators.required],
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
    private router: Router
  ) {}

  get formControls () {return this.registrationForm.controls}

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
