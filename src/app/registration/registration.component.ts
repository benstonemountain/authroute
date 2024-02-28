import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

import {
  onPhoneValidate,
  onEmailValidate,
  onPasswordValidate,
  passwordMatchValidator,
} from '../validators/validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public error: string | null = null;
  registrationForm!: FormGroup;

  ngOnInit() {
    console.log('ngOninit fut');
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],

      userName: ['', [Validators.required, Validators.maxLength(10)]],

      email: ['', [Validators.required, onEmailValidate()]],

      phone: ['', { validators: [Validators.required, onPhoneValidate()] }],

      dialingCode: ['20'],

      password: [
        '',
        {
          validators: [Validators.required, onPasswordValidate],
        },
      ],
      confirmPassword: [''],
    });
    this.registrationForm
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        passwordMatchValidator(this.registrationForm),
      ]);
  }

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  get formControls() {
    return this.registrationForm.controls;
  }

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

    const { name, userName, email, dialingCode, phone, password } =
      this.registrationForm.value;

    this.httpClient
      .post('http://localhost:3000/register', {
        name,
        userName,
        email,
        dialingCode,
        phone,
        password,
      })
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
