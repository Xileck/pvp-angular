import { Constants } from './../../src/app/Clases/utils/Constants';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../src/environments/environment';
import {RolUsuario} from './login-clases/Rol-usuario';
import {Usuario} from './login-clases/Usuario';
import {Modulos} from './login-clases/Modulos';
import {LoginConstants} from './login-utileria/LoginConstants';

@Injectable()
export class LoginAccessService {
  /*Constantes*/
  private readonly servicioValidadUsuario = webORB.bind('com.cfemex.lv.EmpleadoDAO', environment.ruta, null, null);
  private readonly servicioRolUsuario     = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.Rol_usuarioBO',
    environment.ruta, null, null);
  private readonly servicioModulos        = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.ModulosBO',
    environment.ruta, null, null);
  private readonly LS_modulosDelSistema = 'ModulosDelSistema';
  private readonly LS_rolesDelUsuario = 'RolesUsuario';
  private readonly LS_nombreProyecto = 'NombreProyecto';
  private readonly LS_esLoginPublico = 'EsLoginPublico';
  private readonly LS_InfoUsuario = 'InformacionUsuario';
  /*Variables*/
  // Nombre del proyecto guardado en la tabla proy
  private _nombreProyecto: string = environment.nombreProyecto;
  // Indica si el sistema requiere para poder entrar que el usuario tenga módulos guardados en las tablas correspondientes (true)
  // o si puede entrar sólamente con su contraseña y usuario globales (false)
  private _esLoginPublico: boolean;
  // Guarda los datos del usuario que inicia la sesión
  private _usuario: Usuario;
  // Guarda todos los módulos que tiene el sistema
  private _modulosDelSistema: Modulos[];
  // Guarda los roles que tenga el usuario dentro del proyecto (como por ejemplo administrador y evaluador)
  private _rolesDelUsuario: RolUsuario[];
  // Guarda solamente los módulos a los que el usuario tiene acceso (en caso de ser modo dios este va a ser igual al anterior)
  private _modulosDelUsuario: Modulos[];
  // Indica si el usuario tiene acceso a todas las opciones del sistema, sin importar que no esté dado de alta en módulos ni roles
  private _modoDios: boolean;

  constructor(private router: Router) {
    this.resetLogin();
  }

  private resetLogin(): void {
    this.esLoginPublico = true;
    this.usuario  = null;
    this.modulosDelSistema = [];
    this.rolesDelUsuario = [];
    this.modoDios = false;
    this.router.navigate[Constants.VistaAcceso]
  }

  /*--- WEBORB ---*/

  public getEmpleado(rpe: string): any {
    return this.servicioValidadUsuario.seleccionarEmpleado(rpe.toUpperCase());
  }

  public seleccionarRolUsuarioPorProyecto(rpe: string, cveproy: string): RolUsuario[] {
    return this.servicioRolUsuario.seleccionarRolUsuarioPorProyecto(rpe, cveproy);
  }

  public seleccionarModulosPorProyecto(cveproy: string): Modulos[] {
    return this.servicioModulos.seleccionarModulosPorProyecto(cveproy);
  }

  /*--- FUNCIONES PÚBLICAS ---*/

  /*Devuelve true si ya hay una sesión iniciada.*/
  public isLogued(): boolean {
    return ( ( this.esLoginPublico && this.usuario != null) || ( !this.esLoginPublico && this.rolesDelUsuario.length > 0) );
  }

  /*Reinicia la sesión*/
  public logout( nuevaVista: string ): void {
    this.resetLogin();
    localStorage.clear();
    if ( nuevaVista.length > 0 ) {
      this.router.navigate([nuevaVista]);
    }
  }

  public guardarLocalStorage(): void {
    localStorage.setItem(this.nombreProyecto + this.LS_nombreProyecto, JSON.stringify(this.nombreProyecto));
    localStorage.setItem(this.nombreProyecto + this.LS_esLoginPublico, JSON.stringify(this.esLoginPublico));
    localStorage.setItem(this.nombreProyecto + this.LS_InfoUsuario, JSON.stringify(this.usuario));
    localStorage.setItem(this.nombreProyecto + this.LS_modulosDelSistema, JSON.stringify(this.modulosDelSistema));
    localStorage.setItem(this.nombreProyecto + this.LS_rolesDelUsuario, JSON.stringify(this.rolesDelUsuario));
  }

  public recuperarDeLocalStorage(): void {
    if (localStorage.getItem(this.nombreProyecto + this.LS_InfoUsuario)) {
      this.nombreProyecto = JSON.parse(localStorage.getItem(this.nombreProyecto + this.LS_nombreProyecto));
      this.esLoginPublico = JSON.parse(localStorage.getItem(this.nombreProyecto + this.LS_esLoginPublico));
      this.usuario = JSON.parse(localStorage.getItem(this.nombreProyecto + this.LS_InfoUsuario));
      this.modulosDelSistema = JSON.parse(localStorage.getItem(this.nombreProyecto + this.LS_modulosDelSistema));
      this.rolesDelUsuario = JSON.parse(localStorage.getItem(this.nombreProyecto + this.LS_rolesDelUsuario));
    }
  }

  /*--- FUNCIONES PRIVADAS ---*/

  /*Verifica si hay un acceso de tipo 'ModoDios' en un arreglo de RolUsuario*/
  private verificarModoDios( Modulos: RolUsuario[] ): void {
    if ( Modulos.length > 0 ) {
      for ( let i = 0; i < Modulos.length; i++ ) {
        if ( Modulos[i].cve_rol.trim() === LoginConstants.Cve_rol_God ) {
          this.modoDios = true;
          i = Modulos.length;
        }
      }
    }
  }

  /*A partir de los roles que tenga el usuario se sacan los módulos a los que tenga permiso (sin repeticiones).*/
  private sacarModulosDelUsuario( rolesArevisar: RolUsuario[] ): Modulos[] {
    let resultado: Modulos[] = [];
    if ( !this.modoDios ) {
      const modulosAgregados: string[] = [];
      if ( (this.modulosDelSistema.length > 0) && (rolesArevisar.length > 0) ) {
        for ( const ModuloSistema of this.modulosDelSistema ) {
          for ( const RolUsuario of rolesArevisar ) {
            if ( RolUsuario.accesos.length > 0 ) {
              for (const ModuloUsuario of RolUsuario.accesos) {
                if ( (ModuloSistema.cvemodulo === ModuloUsuario.cvemodulo) && (modulosAgregados.indexOf(ModuloUsuario.cvemodulo) < 0) ) {
                  modulosAgregados.push(ModuloSistema.cvemodulo);
                  resultado.push(ModuloSistema);
                }
              }
            }
          }
        }
      }
    } else {
      resultado = this.modulosDelSistema;
    }
    // Si es login público y el usuario no tiene ningún módulo para acceder
    /*if ( this.esLoginPublico && (resultado.length === 0) ) {
      resultado = this.modulosDelSistema;
    }*/

    return resultado;
  }


  /*--- GETTERs y SETTERs*/

  get nombreProyecto(): string {
    return this._nombreProyecto;
  }

  set nombreProyecto(value: string) {
    this._nombreProyecto = value;
  }

  get esLoginPublico(): boolean {
    return this._esLoginPublico;
  }

  set esLoginPublico(value: boolean) {
    this._esLoginPublico = value;
  }

  get usuario(): Usuario {
    return this._usuario;
  }

  set usuario(value: Usuario) {
    this._usuario = value;
  }

  get modulosDelSistema(): Modulos[] {
    return this._modulosDelSistema;
  }

  set modulosDelSistema(value: Modulos[]) {
    this._modulosDelSistema = (value != null) ? value : [];
  }

  get rolesDelUsuario(): RolUsuario[] {
    return this._rolesDelUsuario;
  }

  set rolesDelUsuario(value: RolUsuario[]) {
    this._rolesDelUsuario = (value != null) ? value : [];
    this.verificarModoDios(this._rolesDelUsuario);
    this.modulosDelUsuario = this.sacarModulosDelUsuario(this.rolesDelUsuario);
  }

  get modulosDelUsuario(): Modulos[] {
    return this._modulosDelUsuario;
  }

  set modulosDelUsuario(value: Modulos[]) {
    this._modulosDelUsuario = (value != null) ? value : [];
  }

  get modoDios(): boolean {
    return this._modoDios;
  }

  set modoDios(value: boolean) {
    this._modoDios = value;
  }
}
