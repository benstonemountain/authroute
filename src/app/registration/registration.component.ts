import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ontelephoneValidate } from '../validators/validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


  registrationForm = this.formBuilder.group({

    name: ['', {
      validators: [Validators.required]}],
    userName: ['', {
      validators: [Validators.required] }],
    email: ['', {
      validators: [Validators.required]}],
    phone: ['', {
      validators: [Validators.required, ontelephoneValidate ]}],
    password: ['', {
      validators: [Validators.required]}],
    confirmPassword: ['', {
      validators: [Validators.required]}],

  });


  constructor(private formBuilder: FormBuilder) {}

  onRegistration() {
      console.log(this.registrationForm.controls.phone);
      
  }



}
