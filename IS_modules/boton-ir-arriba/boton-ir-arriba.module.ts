import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonIrArribaComponent } from './boton-ir-arriba/boton-ir-arriba.component';
import {FormsModule} from '@angular/forms';
import {ButtonModule, TooltipModule} from 'primeng/primeng';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    // Componentes de Primeng
    ButtonModule,
    TooltipModule
  ],
  declarations: [BotonIrArribaComponent],
  exports: [BotonIrArribaComponent]
})
export class BotonIrArribaModule { }
