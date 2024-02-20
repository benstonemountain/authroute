import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TargetComponent } from './target/target.component';
import { authGuard } from './auth.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'target', component: TargetComponent, canActivate:[authGuard]
  },
  {
    path: '', component: TargetComponent, canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
