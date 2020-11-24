import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {ButtonModule, GrowlModule, InputTextModule, PanelModule, ProgressSpinnerModule} from 'primeng/primeng';
import {LoginAccessService} from './login-access.service';
import {MessageService} from 'primeng/components/common/messageservice';

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
    GrowlModule
  ],
  providers: [
    LoginAccessService,
    // servicios-busempl de Primeng
    MessageService
  ]
})
export class LoginModule { }
