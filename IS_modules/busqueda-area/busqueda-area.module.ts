import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaAreaComponent } from './busqueda-area/busqueda-area.component';
import {BusquedaAreaService} from './busquedaArea-servicios/busqueda-area.service';
import {DropdownModule} from 'primeng/primeng';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  declarations: [BusquedaAreaComponent],
  exports: [BusquedaAreaComponent],
  providers: [BusquedaAreaService]
})
export class BusquedaAreaModule { }
