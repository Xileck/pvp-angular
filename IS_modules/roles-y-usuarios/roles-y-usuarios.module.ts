import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesComponent} from './roles/roles.component';
import {FormsModule} from '@angular/forms';
import {
  BlockUIModule, ButtonModule, DialogModule, DropdownModule, FieldsetModule, GrowlModule,
  InputTextModule, PanelModule, ProgressSpinnerModule, SidebarModule, TooltipModule, AccordionModule, CheckboxModule,
  OverlayPanelModule, ConfirmDialogModule, ConfirmationService
} from 'primeng/primeng';
import {RolesMensajesService} from './roles-servicios/roles-mensajes.service';
import {WeborbAccesosService} from './roles-servicios/weborb-accesos.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {BusquedaEmpleadoModule} from '../busqueda-empleado/busqueda-empleado.module';
import {ModulosComponent} from './modulos/modulos.component';
import {TableModule} from 'primeng/table';
import {ProyectoComponent} from './proyecto/proyecto.component';
import {BusquedaAreaModule} from "../busqueda-area/busqueda-area.module";

@NgModule({
  declarations: [
    RolesComponent,
    UsuariosComponent,
    ModulosComponent,
    ProyectoComponent],
  exports: [
    RolesComponent,
    UsuariosComponent,
    ModulosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Módulos IS
    BusquedaEmpleadoModule,
    BusquedaAreaModule,
    // Módulos de Primeng
    DialogModule,
    DropdownModule,
    BlockUIModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ProgressSpinnerModule,
    PanelModule,
    SidebarModule,
    FieldsetModule,
    GrowlModule,
    AccordionModule,
    CheckboxModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    TableModule
  ],
  providers: [
    RolesMensajesService,
    WeborbAccesosService,
    ConfirmationService
  ],
})
export class RolesYUsuariosModule {
}
