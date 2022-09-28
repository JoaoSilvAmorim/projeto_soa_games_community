import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth/auth.component';

import { AuthRoutingModule } from './auth.route';
import { SignupComponent } from './component/signup/signup.component';

import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
