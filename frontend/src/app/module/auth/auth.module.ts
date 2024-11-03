import { LocalStorageService } from 'ngx-webstorage';
import { TokenStorageService } from './../../share/services/token-storage/token-storage.service';
import { AuthService } from './../../share/services/auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, TokenStorageService, LocalStorageService]
})
export class AuthModule { }
