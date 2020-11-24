import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneradorComponent } from './generador/generador.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {
  ButtonModule, ConfirmDialogModule, DialogModule, InputTextareaModule, OrderListModule,
  TooltipModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    // Componentes de Primeng
    ConfirmDialogModule,
    OrderListModule,
    InputTextareaModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
  ],
  declarations: [GeneradorComponent],
  exports: [GeneradorComponent]
})
export class GeneradorTextareasModule { }
