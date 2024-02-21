import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService, public router: Router) {}

  public logOutHandler(): void {
    this.authService.setTokenData(null);
    this.router.navigateByUrl('login');
  }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$();
  }
}
