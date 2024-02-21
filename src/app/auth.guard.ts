import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const isAuthenticated = inject(AuthService).isAuthenticated();

  if (!isAuthenticated) {
    return inject(Router).navigateByUrl('/registration');
  }

  return true;
};
