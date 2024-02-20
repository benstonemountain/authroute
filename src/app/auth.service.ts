import { Injectable, inject, signal } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = `http://localhost:3000/user`;

  private readonly _currentUser = signal<User | undefined>(undefined);

  private readonly CURRENT_USER_KEY = `currentUser`;

  private readonly router = inject(Router);

  constructor(private readonly httpClient: HttpClient) {}

  get isLoggedIn() {
    return this._currentUser() !== undefined;
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  login(username: string, password: string) {
    return this.httpClient
      .get<User>(`${this.BASE_URL}`)
      .pipe(
        tap((user) => {
                
         if(user.username === username && user.password === password) {
          this._currentUser.set(user);
          this.storeUser(user);
         } else {
         alert("hibás jelszó vagy felhasználónév");
        
         }
         
        })
      );
  }

  logout() {

        this.clearStoredUseer();
        this._currentUser.set(undefined);
        this.router.navigate(['']);
    
    
  }

  private storeUser(user: User) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
   
  }

  private clearStoredUseer() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}
