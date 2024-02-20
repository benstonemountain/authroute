import { Component, DestroyRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm = this.formBuilder.group({

    username: ['', {validators: Validators.required}],
    password: ['', {validators: Validators.required}],
  })


  constructor
  (private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router, 
  ) {}

  login() {
    if(this.loginForm.value.username && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(
        tap(  () => this.router.navigate(['/target']))
      ).subscribe()
    }

    
  }

}


