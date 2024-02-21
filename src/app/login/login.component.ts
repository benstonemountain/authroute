import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenData } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public error: string | null = null;

  loginForm = this.formBuilder.group({

    email: ['', {validators: Validators.required}],
    password: ['', {validators: Validators.required}],
  })


  constructor
  (private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router, 
    private httpClient: HttpClient
  ) {}

  login() {


    const { email, password } = this.loginForm.value;

    console.log(this.loginForm.value);
    
    console.log(email, password);
    
    this.httpClient
      .post<TokenData>('http://localhost:3000/login', { email, password })
      .pipe(
        catchError((error) => {
          throw error;
        })
      )
      .subscribe((data) => {
        this.authService.setTokenData(data);
        this.router.navigateByUrl('/target');
      });
      
      this.loginForm.reset();
    
  }

}


