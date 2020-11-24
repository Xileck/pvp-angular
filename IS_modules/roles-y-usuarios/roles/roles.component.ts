import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Rol } from '../roles-clases/Rol';
import { Modulo } from '../roles-clases/Modulo';
import { RolesMensajesService } from '../roles-servicios/roles-mensajes.service';
import { WeborbAccesosService } from '../roles-servicios/weborb-accesos.service';
import { AccesosRol } from '../roles-clases/AccesosRol';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RolesComponent implements OnInit {
  // Variables
  rolesDialogShow: boolean;
  rolSeleccionado: Rol;
  rolesDropdown: SelectItem[];
  modulosDelSistema: Modulo[];
  modulosDelRol: Modulo[];
  tableLoader: boolean;
  blockTabla: boolean;
  moduloSeleccionado: Modulo;
  esModoNuevo: boolean;
  nuevoCverol: string;
  nuevoDescrol: string;
  cargarSpinner: boolean;
  // Constantes
  DropdownRolDefault = { label: 'Seleccione un rol', value: null };
  // Entradas
  @Input() public nombreProyecto: string;

  constructor(public rolesMensajesService: RolesMensajesService, private servicioAccesos: WeborbAccesosService) {
    this.rolesDialogShow = true;
    this.nombreProyecto = '';
    this.rolSeleccionado = null;
    this.rolesDropdown = [this.DropdownRolDefault];
    this.modulosDelSistema = [];
    this.tableLoader = false;
    this.modulosDelRol = [];
    this.blockTabla = true;
    this.moduloSeleccionado = null;
    this.esModoNuevo = false;
    this.nuevoCverol = '';
    this.nuevoDescrol = '';
    this.cargarSpinner = false;
  }

  ngOnInit() {
    this.obtenerRoles();
    this.obtenerModulosSistema();
  }

  // Funciones
  private obtenerRoles(): void {
    this.rolesDropdown = [{ label: 'Cargando...', value: null }];
    setTimeout(() => {
      Promise.resolve(this.servicioAccesos.seleccionarRolesPorProyecto(this.nombreProyecto)).then(resultado => {
        this.rolesDropdown = [this.DropdownRolDefault];
        if ((resultado != null) && (resultado.length > 0)) {
          for (const rol of resultado) {
            this.rolesDropdown.push({ label: rol.descrol, value: rol });
          }
        }
      }).catch(() => {
        console.log('Error en obtenerRoles');
      });
    }, 1000
    );
  }

  private obtenerModulosSistema(): void {
    this.modulosDelSistema = [];
    this.tableLoader = true;
    setTimeout(() => {
      Promise.resolve(this.servicioAccesos.seleccionarModulosPorProyecto(this.nombreProyecto)).then(resultado => {
        this.modulosDelSistema = (resultado != null) ? resultado : [];
        this.tableLoader = false;
        // this.centerPdialog();
      }).catch(() => {
        console.log('Error en obtenerModulosSistema');
      });
    }, 1000
    );
  }

  private obtenerModulosDelRol(cverol: string): void {
    this.modulosDelRol = [];
    this.tableLoader = true;
    setTimeout(() => {
      Promise.resolve(this.servicioAccesos.seleccionarModulosPorRol(cverol, this.nombreProyecto)).then(resultado => {
        this.blockTabla = (cverol.trim() === 'GOD' || resultado == null);
        this.modulosDelRol = (resultado != null) ? resultado : [];
        this.tableLoader = false;
      }).catch(() => {
        console.log('Error en obtenerModulosDelRol');
      });
    }, 1000
    );
  }

  /*centerPdialog(): void {
    window.setTimeout(() => {
      this.adminRolesDialog.center();
    });
  }*/

  obtenerClasesLock(cvemodulo: string): string[] {
    const clases = 'fa fa-fw lock-permiso cursor-pointer'.split(' ');
    let claseCandado = 'fa-lock';
    if (this.rolSeleccionado != null && this.rolSeleccionado.cverol === 'GOD') {
      claseCandado = 'fa-unlock';
    } else if (this.modulosDelRol.length > 0) {
      const cveModulosRol = [];
      for (const Modulo of this.modulosDelRol) {
        cveModulosRol.push(Modulo.cvemodulo.trim());
      }
      if (cveModulosRol.indexOf(cvemodulo) >= 0) {
        claseCandado = 'fa-unlock';
      }
    }
    clases.push(claseCandado);

    return clases;
  }

  obtenerNumeroPosmodulo(posmodulo: string): string {
    let numero = '';
    const posmoduloSplited = posmodulo.split('0');
    const posSlength = posmoduloSplited.length;
    for (let i = 0; i < posSlength; i++) {
      if (posmoduloSplited[i].trim().length > 0) {
        numero += (numero.length === 0) ? posmoduloSplited[i] : '.' + posmoduloSplited[i];
      }
    }

    return numero;
  }

  private convertirModulosAaccesosrol(modulos: Modulo[]): AccesosRol[] {
    const accesos: AccesosRol[] = [];
    if (modulos.length > 0) {
      for (const m of modulos) {
        accesos.push(
          {consacceso: '', cveproy: this.nombreProyecto, cverol: this.rolSeleccionado.cverol, cvemodulo: m.cvemodulo, cvecampo: ''}
        );
      }
    }

    return accesos;
  }

  /*--- Eventos ---*/
  clicCancelar(): void {
    this.blockTabla = true;
    this.modulosDelRol = [];
    this.rolSeleccionado = null;
  }

  clicGuardarAccesos(): void {
    this.blockTabla = true;
    this.tableLoader = true;
    const accesosAguardar = this.convertirModulosAaccesosrol(this.modulosDelRol);
    setTimeout(() => {
      Promise.resolve(this.servicioAccesos.insertarAccesosRolPorProyecto(accesosAguardar, this.nombreProyecto,
        this.rolSeleccionado.cverol)).then(resultado => {
          this.blockTabla = false;
          this.tableLoader = false;
          if (resultado > 0) {
            this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Succes, 'Guardado',
              'Se han guardado los módulos del rol ' + this.rolSeleccionado.descrol);
          } else {
            this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Error', 'No se han guardado los módulos');
          }
        }).catch(() => {
          console.log('Error en clicGuardarAccesos');
        });
    }, 1000
    );
  }

  seleccioDeRol(rol: any): void {
    if (rol.value != null) {
      this.obtenerModulosDelRol(rol.value.cverol);
    } else {
      this.modulosDelRol = [];
    }
  }

  seleccionandoModuloTabla(event) {
    // Modulo que el usuario hizo doble clic
    const ModuloSeleccionado = event;
    this.moduloSeleccionado = ModuloSeleccionado;
    // Obtener el índice del módulo seleccionado en el arreglo de módulos del rol del dropdown (si no existe entonces se
    // queda en -1)
    let IndiceModulo = -1;
    for (let i = 0; i < this.modulosDelRol.length; i++) {
      if (this.modulosDelRol[i].cvemodulo.trim().toUpperCase() === ModuloSeleccionado.cvemodulo.trim().toUpperCase()) {
        IndiceModulo = i;
      }
    }
    // Modificar el arreglo de módulos del rol del dropdown: agregando o eliminando el rol seleccionado con doble clic
    const modulosAux = this.modulosDelRol;
    if (IndiceModulo >= 0) {
      modulosAux.splice(IndiceModulo, 1);
    } else {
      modulosAux.push(ModuloSeleccionado);
    }
    this.modulosDelRol = modulosAux;
  }

  nuevoRol_cancelar(): void {
    this.nuevoCverol = '';
    this.nuevoDescrol = '';
    this.esModoNuevo = !this.esModoNuevo;
  }

  validarNuevoRol(): void {
    this.nuevoCverol = this.nuevoCverol.trim().toUpperCase();
    this.nuevoDescrol = this.nuevoDescrol.trim().toUpperCase();
    if ((this.nuevoCverol.length > 0) && (this.nuevoDescrol.length > 0)) {
      this.guardarRol();
    } else {
      this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Error', 'Falta información por llenar');
    }
  }

  private guardarRol(): void {
    this.cargarSpinner = true;
    const nuevoRol = {
      cverol: this.nuevoCverol.trim().toUpperCase(),
      descrol: this.nuevoDescrol.trim().toUpperCase(),
      cveproy: this.nombreProyecto
    };
    setTimeout(() => {
      Promise.resolve(this.servicioAccesos.insertarRol(nuevoRol)).then(resultado => {
        this.cargarSpinner = false;
        if (resultado > 0) {
          this.rolesDropdown.push({
            label: this.nuevoDescrol,
            value: {
              cverol: this.nuevoCverol.trim().toUpperCase(),
              descrol: this.nuevoDescrol.trim().toUpperCase(),
              cveproy: this.nombreProyecto
            }
          });
          this.nuevoCverol = '';
          this.nuevoDescrol = '';
          this.esModoNuevo = false;
          this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Succes, 'Guardado', 'El rol se ha guardado exitosamente');
        } else {
          this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Error', 'El rol no se ha guardado');
        }
      }).catch(() => {
        console.log('Error en guardarRol');
      });
    }, 1000
    );
  }

}
