import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BusquedaAreaService} from '../busquedaArea-servicios/busqueda-area.service';
import {Area} from '../busquedaArea-beans/Area';

@Component({
  selector: 'app-busqueda-area',
  templateUrl: './busqueda-area.component.html',
  styleUrls: ['./busqueda-area.component.css']
})
export class BusquedaAreaComponent implements OnInit, DoCheck {
  dropdownAreas: Area[];
  areaSeleccionadaObj: Area;
  @Output() areaSeleccionada = new EventEmitter();
  @Input() cveAreaPreSeleccionada: string;
  @Input() esSoloLectura: boolean;
  private cveAreaPreSeleccionadaAnterior: string;
  private nipDoCheck: boolean;

  constructor(private servicioArea: BusquedaAreaService) {
    this.dropdownAreas = [{clave: null, descripcion: 'Cargando...', areapadre: '', vigencia: '', rpe: ''}];
    this.limpiarAreaObj();
    this.cveAreaPreSeleccionada = '';
    this.cveAreaPreSeleccionadaAnterior = '';
    this.nipDoCheck = true;
    this.esSoloLectura = false;
  }

  ngOnInit() {
    this.seleccionarAreas();
  }
  public limpiarAreaObj(): void {
    this.areaSeleccionadaObj = {
      clave: '', descripcion: '', areapadre: '', vigencia: '', rpe: ''
    };
  }

  ngDoCheck(): void {
    // Si hay cambios en el cveAreaPreSeleccionada entonces se va a actualizar el objeto (se manda el nip desde el componente padre)
    if (this.nipDoCheck && (this.dropdownAreas.length > 1) && (this.cveAreaPreSeleccionada.length > 0) &&
      (this.cveAreaPreSeleccionadaAnterior !== this.cveAreaPreSeleccionada)) {
      this.nipDoCheck = false;
      this.setAreaSeleccionada();
    }
  }
  private setAreaSeleccionada() {
    for (const area of this.dropdownAreas) {
      if (area.clave === this.cveAreaPreSeleccionada) {
        this.areaSeleccionadaObj = area;
        this.cveAreaPreSeleccionadaAnterior = this.cveAreaPreSeleccionada;
        this.nipDoCheck = true;
        break;
      }
    }
  }

  private seleccionarAreas(): void {
    setTimeout(() => {
      Promise.resolve(this.servicioArea.obtenerTodasLasAreas()).then(resultado => {
        if (resultado != null && resultado.length > 0) {
          this.dropdownAreas = resultado;
          const opcionPredeterminada = {clave: null, descripcion: 'Seleccione un área', areapadre: '', vigencia: '', rpe: ''};
          this.dropdownAreas.splice(0, 0, opcionPredeterminada);
        }
      }).catch(function (e) {
        console.log(e.statusText);
      });
    }, 100);
  }

  seleccionoArea(): void {
    this.areaSeleccionada.emit(this.areaSeleccionadaObj);
  }
}
