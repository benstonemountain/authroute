import { AuthService } from '../auth.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthServiceImpl } from '../auth.service.impl';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
