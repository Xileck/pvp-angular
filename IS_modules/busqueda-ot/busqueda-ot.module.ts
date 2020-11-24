import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaOtComponent } from './busqueda-ot/busqueda-ot.component';
import { ServicioBusquedaOtService } from './servicio-busqueda-ot.service';
import { InputTextModule, ButtonModule, TooltipModule, ProgressSpinnerModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    // Componentes de Primeng
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ProgressSpinnerModule
  ],
  exports: [
    BusquedaOtComponent
  ],
  declarations: [BusquedaOtComponent],
  providers: [ServicioBusquedaOtService]
})
export class BusquedaOtModule { }
