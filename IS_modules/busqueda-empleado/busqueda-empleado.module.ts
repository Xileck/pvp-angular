import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaEmpleadoComponent } from './busqueda-empleado/busqueda-empleado.component';
import {
  ButtonModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  InputTextModule,
  ProgressSpinnerModule,
  TooltipModule
} from 'primeng';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusquedaEmpleadoService} from './servicios-busempl/busqueda-empleado.service';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    // Componentes de Primeng
    DialogModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    TableModule
  ],
  exports: [
    BusquedaEmpleadoComponent
  ],
  declarations: [BusquedaEmpleadoComponent],
  providers: [
    BusquedaEmpleadoService,
    ConfirmationService
  ]
})
export class BusquedaEmpleadoModule { }
