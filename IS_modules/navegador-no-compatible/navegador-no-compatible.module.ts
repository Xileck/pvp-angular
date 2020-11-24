import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavegadorNoCompatibleComponent} from './navegador-no-compatible/navegador-no-compatible.component';
import {PanelModule} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {NavegadorCompatibilidadService} from './navegador-compatibilidad.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
  ],
  declarations: [NavegadorNoCompatibleComponent],
  providers: [NavegadorCompatibilidadService],
  exports: [NavegadorNoCompatibleComponent]
})
export class NavegadorNoCompatibleModule { }
