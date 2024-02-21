import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

import { User } from './user';
import { TokenData, TOKEN_DATA } from './auth';


import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceImpl extends AuthService {
  private isAuthenticated$$: Subject<boolean>;
  private tokenData: TokenData | null = null;

  constructor() {
    super();

    this.isAuthenticated$$ = new BehaviorSubject(false);
    this.tokenData = this.getTokenData();
    this.isAuthenticated$$.next(this.isAuthenticated());
  }

  public getUser(): User {
    throw new Error('Method not implemented.');
  }

  public isAuthenticated(): boolean {
    return !!this.tokenData;
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$$.asObservable();
  }

  public setTokenData(tokenData: TokenData | null): void {
    this.tokenData = tokenData;
    this.saveTokenData(tokenData);
    this.isAuthenticated$$.next(this.isAuthenticated());
  }

  private getTokenData(): TokenData | null {
    const tokenDataAsString = localStorage.getItem(TOKEN_DATA);
    return tokenDataAsString ? JSON.parse(tokenDataAsString) : null;
  }

  private saveTokenData(tokenData: TokenData | null): void {
    tokenData
      ? localStorage.setItem(TOKEN_DATA, JSON.stringify(tokenData))
      : localStorage.removeItem(TOKEN_DATA);
  }
}
