import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {RolUsuario} from '../roles-clases/RolUsuario';
import {ConfirmationService, SelectItem} from 'primeng';
import {Modulo} from '../roles-clases/Modulo';
import {EmpleadoBusEmpl} from '../../busqueda-empleado/BusEmpl-clases/BEANs/EmpleadoBusEmpl';
import {FotoBusEmpl} from '../../busqueda-empleado/BusEmpl-clases/BEANs/FotoBusEmpl';
import {RolesMensajesService} from '../roles-servicios/roles-mensajes.service';
import {WeborbAccesosService} from '../roles-servicios/weborb-accesos.service';
import {
  BusquedaEmpleadoService, EmpleadoDummy,
  FotoEmpleadoDummy
} from '../../busqueda-empleado/servicios-busempl/busqueda-empleado.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {
  /*--- Observable ---*/
  empleado$ = new Observable<EmpleadoBusEmpl>();
  private empleadoSubject$ = new Subject<EmpleadoBusEmpl>();
  // Variables
  cargarSpinner: boolean;
  indiceAcordeon: number;
  tituloAcordeon2: string;
  usuarios: RolUsuario[];
  tableLoaderUsuarios: boolean;
  tableLoaderModulos: boolean;
  usuario_seleccionado: RolUsuario;
  empleado_busEmpl: EmpleadoBusEmpl;
  empleado_busEmplNip: string;
  empleado_foto: FotoBusEmpl;
  rol_seleccionado: string;
  roles_dropdown: SelectItem[];
  checkB_password: boolean;
  password: string;
  passwordConfirm: string;
  modulosSistema: Modulo[];
  modulosDelRol: Modulo[];
  // Entradas
  @Input() public nombreProyecto: string;
  // Constantes
  readonly IndiceNuevoUsuario = 0;
  readonly IndiceListaUsuarios = 1;
  readonly DropdownRol_default = {label: 'Seleccione un rol', value: ''};
  readonly TituloInfo = 'Información de ';
  readonly TituloNuevo = 'Nuevo usuario';

  constructor(public rolesMensajesService: RolesMensajesService,
              private servicioAccesos: WeborbAccesosService,
              private servicioBusEmpl: BusquedaEmpleadoService,
              private confirmationService: ConfirmationService) {
    this.indiceAcordeon = this.IndiceListaUsuarios;
    this.nombreProyecto = '';
    this.cargarSpinner = false;
    this.usuarios = [];
    this.tableLoaderUsuarios = false;
    this.tableLoaderModulos = false;
    this.usuario_seleccionado = null;
    this.roles_dropdown = [this.DropdownRol_default];
    this.modulosSistema = [];
    this.modulosDelRol = [];
    this.limpiarFormularioUsuario();
  }

  ngOnInit() {
    this.inicializarObservableBusquedaEmpleado();
    this.obtenerRoles();
    this.obtenerUsuarios();
    this.obtenerModulosSistema();
  }

  inicializarObservableBusquedaEmpleado() {
    // Suscribir el observable
    this.empleado$ = this.getEmpleado$();
    this.empleado$.subscribe(empleado => {
      this.empleado_busEmpl = empleado;
      if (this.empleado_busEmpl.nip.length > 0) {
        // console.log('this.empleado_busEmpl.nip = ' + this.empleado_busEmpl.nip);
        this.obtenerFotoUsuario(this.empleado_busEmpl.nip.trim());
      }
    });
    //  Inicializar el objeto
    this.inicializarEmpleado();
  }


  /*--- Funciones ---*/
  private obtenerRoles(): void {
    this.roles_dropdown = [{label: 'Cargando...', value: null}];
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.seleccionarRolesPorProyecto(this.nombreProyecto)).then(resultado => {
          this.roles_dropdown = [this.DropdownRol_default];
          if ((resultado != null) && (resultado.length > 0)) {
            for (const rol of resultado) {
              this.roles_dropdown.push({label: rol.descrol, value: rol.cverol.trim()});
            }
          }
        }).catch(function (e) {
          console.log('Error en obtenerRoles');
        });
      }, 1000
    );
  }

  private obtenerUsuarios(): void {
    this.usuarios = [];
    this.tableLoaderUsuarios = true;
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.seleccionarTodosRolUsuario(this.nombreProyecto)).then(resultado => {
          this.tableLoaderUsuarios = false;
          if ((resultado != null) && (resultado.length > 0)) {
            this.usuarios = resultado;
          }
        }).catch(function (e) {
          console.log('Error en obtenerUsuarios');
        });
      }, 1000
    );
  }

  private obtenerModulosSistema(): void {
    this.modulosSistema = [];
    this.tableLoaderModulos = true;
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.seleccionarModulosPorProyecto(this.nombreProyecto)).then(resultado => {
          this.modulosSistema = (resultado != null) ? resultado : [];
          this.tableLoaderModulos = false;
          // this.centerPdialog();
        }).catch(function (e) {
          console.log('Error en obtenerModulosSistema');
        });
      }, 1000
    );
  }

  obtenerModulosDelRol(cverol: string): void {
    if (cverol.trim().toUpperCase() !== 'GOD') {
      this.modulosDelRol = [];
      this.tableLoaderModulos = true;
      setTimeout(() => {
          Promise.resolve(this.servicioAccesos.seleccionarModulosPorRol(cverol, this.nombreProyecto)).then(resultado => {
            this.modulosDelRol = (resultado != null) ? resultado : [];
            this.tableLoaderModulos = false;
          }).catch(function (e) {
            console.log('Error en obtenerModulosDelRol');
          });
        }, 1000
      );
    } else {
      this.modulosDelRol = this.modulosSistema;
    }
  }

  convertArrayBytesToBase64(byte: any): string {
    let binary = '';
    const bytes = new Uint8Array(byte);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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

  obtenerClasesLock(cvemodulo: string): string[] {
    const clases = 'fa fa-fw lock-permiso'.split(' ');
    let claseCandado = 'fa-lock';
    if (this.modulosDelRol.length > 0) {
      const cveModulosRol = [];
      for (const ModuloDelRol of this.modulosDelRol) {
        cveModulosRol.push(ModuloDelRol.cvemodulo);
      }
      if (cveModulosRol.indexOf(cvemodulo) >= 0) {
        claseCandado = 'fa-unlock';
      }
    }
    clases.push(claseCandado);

    return clases;
  }

  private limpiarFormularioUsuario(): void {
    this.tituloAcordeon2 = this.TituloNuevo;
    this.empleado_foto = null;
    this.empleado_busEmplNip = '';
    this.rol_seleccionado = '';
    this.checkB_password = false;
    this.password = '';
    this.passwordConfirm = '';
  }

  private obtenerFotoUsuario(nip: string): void {
    if (nip.length > 0) {
      this.cargarSpinner = true;
      this.empleado_foto = FotoEmpleadoDummy;
      setTimeout(() => {
          Promise.resolve(this.servicioBusEmpl.seleccionarFoto(nip)).then(resultado => {
            this.cargarSpinner = false;
            this.empleado_foto = resultado;
          }).catch(function (e) {
            console.log('Error en obtenerFotoUsuario');
          });
        }, 1000
      );
    }
  }

  private validarFormUsuario(): boolean {
    this.password = this.password.trim();
    this.passwordConfirm = this.passwordConfirm.trim();

    if (this.empleado_busEmpl == null || this.empleado_busEmpl.nip.length === 0) {
      this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Falta',
        'Requiere que se busque un usuario');
      return false;
    }
    if (this.rol_seleccionado.length === 0) {
      this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Falta',
        'Se requiere un rol');
      return false;
    }
    if (this.checkB_password && (this.password.length === 0 || this.passwordConfirm.length === 0)) {
      this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Contraseñas',
        'Llene los campos de las contraseñas');
      return false;
    }
    if (this.checkB_password && (this.password !== this.passwordConfirm)) {
      this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Contraseñas',
        'La contraseña de confirmación no coincide');
      return false;
    }

    return true;
  }

  private guardarUsuario(): void {
    this.cargarSpinner = true;
    const rolUsuario = {
      cve_usuario: this.empleado_busEmpl.rpe,
      cve_proy: this.nombreProyecto.trim(),
      cve_areagpo: this.empleado_busEmpl.cvearea.trim().toUpperCase(),
      cve_rol: this.rol_seleccionado.trim(),
      nip: this.empleado_busEmpl.nip,
      password: this.password,
      permisos: '',
      nipSuplente: '',
      accesos: null,
      descrol: '',
      nombreCompleto: this.empleado_busEmpl.nombreCompleto
    };
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.guardarRolUsuario(rolUsuario)).then(resultado => {
          this.cargarSpinner = false;
          if (resultado > 0) {
            this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Succes, 'Guardado', 'Se ha guardado exitosamente');
            this.obtenerUsuarios();
          } else {
            this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Error',
              'No se guardaron los datos del usuario por un error');
          }
        }).catch(function (e) {
          console.log('Error en guardarUsuario');
        });
      }, 1000
    );
  }

  private eliminarUsuario(usuario: RolUsuario): void {
    this.cargarSpinner = true;
    setTimeout(() => {
        Promise.resolve(this.servicioAccesos.eliminarRolUsuario(usuario.cve_proy, usuario.cve_usuario, usuario.cve_rol)).then(resultado => {
          this.cargarSpinner = false;
          if (resultado > 0) {
            this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Succes, 'Eliminado', 'Se ha eliminado exitosamente');
            this.obtenerUsuarios();
          } else {
            this.rolesMensajesService.showTempMessage(RolesMensajesService.Pgrowl_Error, 'Error',
              'No se eliminó por un error');
          }
        }).catch(function (e) {
          console.log('Error en eliminarUsuario');
        });
      }, 1000
    );
  }


  /*--- Eventos ---*/
  clicVerfotoUsuario(usuario: RolUsuario): void {
    this.obtenerFotoUsuario(usuario.nip);
  }

  clicEliminarUsuario(usuario: RolUsuario): void {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar a ' + usuario.nombreCompleto + ' con rol de ' + usuario.descrol + '?',
      accept: () => {
        this.eliminarUsuario(usuario);
      }
    });
  }

  seleccionandoUsuarioTabla(event) {
    console.log(event);
    // Usuario al que se le hizo doble clic
    const UsuarioSeleccionado = event;
    this.indiceAcordeon = this.IndiceNuevoUsuario;
    this.tituloAcordeon2 = this.TituloInfo + UsuarioSeleccionado.nombreCompleto;
    // Cambiar datos del formulario
    this.empleado_busEmplNip = UsuarioSeleccionado.nip;
    this.rol_seleccionado = UsuarioSeleccionado.cve_rol.trim();
    this.checkB_password = ((UsuarioSeleccionado.password != null) && (UsuarioSeleccionado.password.trim().length > 0));
    if (this.checkB_password) {
      this.password = UsuarioSeleccionado.password.trim();
      this.passwordConfirm = this.password;
    }
    this.obtenerModulosDelRol(UsuarioSeleccionado.cve_rol.trim());
  }

  checkbox_passwordChange(checked: boolean): void {
    if (!checked) {
      this.password = '';
      this.passwordConfirm = '';
    }
  }

  clicGuardarUsuario(): void {
    if (this.validarFormUsuario()) {
      this.guardarUsuario();
    }
  }

  clicCancelarUsuario(): void {
    this.indiceAcordeon = this.IndiceListaUsuarios;
    this.tituloAcordeon2 = this.TituloNuevo;
    this.limpiarFormularioUsuario();
  }

  onTabOpen(event): void {
    this.indiceAcordeon = event.index;
    this.tituloAcordeon2 = this.TituloNuevo;
    this.limpiarFormularioUsuario();
  }

  /*Funciones del Observable*/

  public inicializarEmpleado() {
    this.actualizarEmpleado(Object.assign({}, EmpleadoDummy));
  }

  public actualizarEmpleado(nuevoEmpleado: EmpleadoBusEmpl) {
    this.empleadoSubject$.next(nuevoEmpleado);
  }

  public getEmpleado$(): Observable<EmpleadoBusEmpl> {
    return this.empleadoSubject$.asObservable();
  }


  /*--- GETTERs y SETTERs ---*/

  /*get empleado_busEmpl(): EmpleadoBusEmpl {
    return this._empleado_busEmpl;
  }

  set empleado_busEmpl(value: EmpleadoBusEmpl) {
    this._empleado_busEmpl = (value != null) ? value : new EmpleadoBusEmpl('', '', '', '', '', '');

    if (this._empleado_busEmpl.nip.trim().length > 0) {
      this.obtenerFotoUsuario(this._empleado_busEmpl.nip.trim());
    }
  }*/
}
