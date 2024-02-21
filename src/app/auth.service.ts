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


  // private readonly BASE_URL = `http://localhost:3000/user`;

  // private readonly _currentUser = signal<User | undefined>(undefined);

  // private readonly CURRENT_USER_KEY = `currentUser`;

  // private readonly router = inject(Router);

  //  httpClien!: HttpClient;

  // constructor() {}

  // get isLoggedIn() {
  //   return this._currentUser() !== undefined;
  // }

  // get currentUser() {
  //   return this._currentUser.asReadonly();
  // }

  // login(username: string, password: string) {
  //   return this.httpClien
  //     .get<User>(`${this.BASE_URL}`)
  //     .pipe(
  //       tap((user) => {
                
  //        if(user.username === username && user.password === password) {
  //         this._currentUser.set(user);
  //         this.storeUser(user);
  //        } else {
  //        alert("hibás jelszó vagy felhasználónév");
        
  //        }
         
  //       })
  //     );
  // }

  // logout() {

  //       this.clearStoredUseer();
  //       this._currentUser.set(undefined);
  //       this.router.navigate(['']);
    
    
  // }

  // private storeUser(user: User) {
  //   localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
   
  // }

  // private clearStoredUseer() {
  //   localStorage.removeItem(this.CURRENT_USER_KEY);
  // }
}
