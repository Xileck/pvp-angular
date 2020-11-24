import {Component, Input, OnInit} from '@angular/core';
import {WeborbAccesosService} from '../roles-servicios/weborb-accesos.service';
import {Proyecto} from '../roles-clases/Proyecto';
import {RolesMensajesService} from '../roles-servicios/roles-mensajes.service';
import {Area} from '../../busqueda-area/busquedaArea-beans/Area';
import {EmpleadoBusEmpl} from '../../busqueda-empleado/BusEmpl-clases/BEANs/EmpleadoBusEmpl';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  @Input() nombreProyecto: string;
  mostrarPopup: boolean;
  mensaje: string;
  mostrarBotonAltaProyecto: boolean;
  cargarSpinner: boolean;
  esModoFormulario: boolean;
  formularioArea: string;
  formularioAreaUsuario: string;
  formularioDescripcion: string;
  responsableProyecto: EmpleadoBusEmpl;
  formularioObjetivo: string;
  formularioUnidad: string;
  formularioUrl: string;
  formularioVersion: string;
  readonly UnidadOptions = [
    {label: 'Seleccione la Unidad', value: ''},
    {label: 'Ambas', value: 'A'},
    {label: '1', value: '1'},
    {label: '2', value: '2'}
  ];

  constructor(private servicioAccesos: WeborbAccesosService, private servicioMensajes: RolesMensajesService) {
    this.nombreProyecto = '';
    this.mostrarPopup = false;
    this.mensaje = '';
    this.cargarSpinner = false;
    this.mostrarBotonAltaProyecto = true;
    this.esModoFormulario = false;
    this.formularioArea = '';
    this.formularioAreaUsuario = '';
    this.formularioDescripcion = '';
    this.responsableProyecto = null;
    this.formularioObjetivo = 'N/A';
    this.formularioUnidad = '';
    this.formularioUrl = '';
    this.formularioVersion = '';
  }

  ngOnInit() {
    this.buscarProyecto();
  }

  private buscarProyecto(): void {
    this.cargarSpinner = true;
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.buscarProyecto(this.nombreProyecto)).then(resultado => {
          this.cargarSpinner = false;
          if (resultado != null) {
            this.mostrarPopup = false;
          } else {
            this.mostrarPopup = true;
            this.mensaje = 'El proyecto \'' + this.nombreProyecto + '\' en la tabla proy aún no ha sido creado. ¿Desea darlo de alta?';
          }
        }).catch(() => {
          console.log('Error en buscarProyecto');
        });
      }, 1000
    );
  }

  guardarProyecto(): void {
    this.cargarSpinner = true;
    const NuevoProyecto: Proyecto = {
      cveproy: this.nombreProyecto,
      claveArea: this.formularioArea,
      claveAreaUsuario: this.formularioAreaUsuario,
      descproy: this.formularioDescripcion,
      nipResponsable: this.responsableProyecto.nip,
      objetivo: this.formularioObjetivo,
      unidad: this.formularioUnidad,
      url: this.formularioUrl,
      version: this.formularioVersion
    };
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.guardarProyecto(NuevoProyecto)).then(resultado => {
          this.cargarSpinner = false;
          if (resultado >= 0) {
            this.mostrarPopup = false;
            this.servicioMensajes.showTempMessage(RolesMensajesService.Pgrowl_Succes, 'Guardado',
              'Se ha guardado el proyecto ' + NuevoProyecto.cveproy + ' exitosamente.');
          } else {
            this.mostrarBotonAltaProyecto = false;
            this.mensaje = 'Ha ocurrido un error al intentar guardar el proyecto, favor de reportarlo con ' +
              'Ingeniería de Software';
          }
        }).catch(function (e) {
          console.log('Error en clicAltaProyecto');
        });
      }, 1000
    );
  }

  private esNumero(cadena: string): boolean {
    const numero = new RegExp('^[0-9]+([.][0-9]+)?$', 'i');
    return numero.test(cadena);
  }

  /*--- EVENTOS ---*/
  clicAltaProyecto(proyDialog: any): void {
    // Habilitar modo formulario
    this.esModoFormulario = true;
    this.mensaje = 'Alta del proyecto ' + this.nombreProyecto;
    // Centrar popup
    this.cargarSpinner = true;
    setTimeout(() => {
      proyDialog.center();
      this.cargarSpinner = false;
      }, 500
    );
  }

  clicRegresar(): void {
    window.open('/', '_self');
  }

  clicGuardar(): void {
    if (this.validarFormulario()) {
      this.guardarProyecto();
    }
  }
  private validarFormulario(): boolean {
    let validado = true;
    let mensajeFaltantes = 'Faltan los siguientes datos:';
    if (this.formularioArea.length === 0) {
      mensajeFaltantes += '<br>*Área del proyecto';
      validado = false;
    }
    if (this.formularioAreaUsuario.length === 0) {
      mensajeFaltantes += '<br>*Área del usuario';
      validado = false;
    }
    if (this.formularioDescripcion.length === 0) {
      mensajeFaltantes += '<br>*Descripción del proyecto';
      validado = false;
    }
    if (this.responsableProyecto == null || this.responsableProyecto.nip.length === 0) {
      mensajeFaltantes += '<br>*Responsable del proyecto';
      validado = false;
    }
    if (this.formularioUnidad.length === 0) {
      mensajeFaltantes += '<br>*Unidad del proyecto';
      validado = false;
    }
    if (this.formularioUrl.length === 0) {
      mensajeFaltantes += '<br>*Url del proyecto';
      validado = false;
    }
    if (!this.esNumero(this.formularioVersion)) {
      mensajeFaltantes += '<br>*Versión del proyecto no es un número flotante';
      validado = false;
    }

    if (!validado) {
      this.servicioMensajes.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Error', mensajeFaltantes);
    }
    return validado;
  }

  seleccionarArea(areaSeleccionada: Area): void {
    this.formularioArea = areaSeleccionada.clave;
  }

  seleccionarAreaUsuario(areaSeleccionada: Area): void {
    this.formularioAreaUsuario = areaSeleccionada.clave;
  }
}
