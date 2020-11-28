
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ButtonModule, ToastModule, InputTextModule, PanelModule, ProgressSpinnerModule,  MessageService } from 'primeng';
import {LoginAccessService} from './login-access.service';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    // Componente de Primeng
    PanelModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [
    LoginAccessService,
    // servicios-busempl de Primeng
    MessageService
  ]
})
export class LoginModule { }
