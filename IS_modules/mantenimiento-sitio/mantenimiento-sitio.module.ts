import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VistaMantenimientoComponent} from './vista-mantenimiento/vista-mantenimiento.component';
import {FormsModule} from '@angular/forms';
import {ButtonModule, PanelModule} from 'primeng/primeng';

@NgModule({
    imports: [
        // componentes por modular
        CommonModule,
        FormsModule,
        // Componentes de Primeng
        PanelModule,
        ButtonModule
    ],
    declarations: [VistaMantenimientoComponent],
    exports: [VistaMantenimientoComponent]
})
export class MantenimientoSitioModule {
}
