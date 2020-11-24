import { Component, OnInit, Output, EventEmitter, Input, DoCheck, ɵConsole } from '@angular/core';
import { OrdenTrabajo } from '../clases/OrdenTrabajo';
import { ServicioBusquedaOtService } from '../servicio-busqueda-ot.service';

@Component({
  selector: 'app-busqueda-ot',
  templateUrl: './busqueda-ot.component.html',
  styleUrls: ['./busqueda-ot.component.css']
})
export class BusquedaOtComponent implements OnInit {
  cargando: boolean;
  ot: OrdenTrabajo;
  @Input() numorden: string;
  @Output() otOutput = new EventEmitter();
  /*--- Constantes ---*/
  private readonly EnterKeyCode = 'Enter';
  private readonly EnterNumKeyCode = 'NumpadEnter';

  constructor(private servicioOt: ServicioBusquedaOtService) {
    this.cargando = false;
    this.limpiar();
  }

  ngOnInit() {
  }

  public limpiar(): void {
    this.numorden = '';
    this.ot = {
      numero: '',
      autor: '',
      descripcion: '',
      puestoTrabajo: '',
      ubicacion: '',
      unidad: ''
    };
  }

  teclaPresionada(event: any): void {
    if ((event.code === this.EnterKeyCode) || (event.code === this.EnterNumKeyCode)) {
      this.buscarOt();
    }
  }

  buscarOt(): void {
    this.numorden = this.numorden.trim();
    if (this.numorden.length > 0) {
      this.cargando = true;
      setTimeout(() => {
        Promise.resolve(this.servicioOt.seleccionarOt(this.numorden)).then(resultado => {
          this.cargando = false;
          if (resultado != null && resultado.numero.trim().length > 0) {
            this.ot = resultado;
            this.otOutput.emit(this.ot);
          }
        }).catch(function (e) {
          console.log('Error en buscarOt de BusquedaOtComponent');
        });
      }, 1000);
    }
  }
}
