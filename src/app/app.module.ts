import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TargetComponent } from './target/target.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration/registration.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// autentikáció/autorizációhoz
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// HTTP_INTERCEPTORS megy a providers-be

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthModule } from './module/auth.module';
// AuthModule megy az imports-ba

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TargetComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
