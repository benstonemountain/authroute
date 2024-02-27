import { Injectable, inject, signal } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenData } from './auth';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService {


  public abstract getUser(): User;
  public abstract isAuthenticated(): boolean;
  public abstract isAuthenticated$(): Observable<boolean>;
  public abstract setTokenData(tokenData: TokenData | null): void;

}
