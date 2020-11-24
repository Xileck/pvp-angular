import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginAccessService} from '../login-access.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import {LoginConstants} from '../login-utileria/LoginConstants';
import {Constants} from '../../../src/app/Clases/utils/Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  /*Entradas*/
  @Input() nombreProyecto: string;
  @Input() esLoginPublico: boolean;
  @Input() vistaPrincipal: string;
  /*Variables*/
  usuario: string;
  contrasenia: string;
  loginLoading: boolean;
  loginMensaje: Message[];
  loginMensaje_severidad: string;
  /*Constantes*/
  readonly Constants = LoginConstants;
  private readonly msjErrorLoginPrivado = 'Este usuario no tiene permisos para acceder al sistema, favor de llamar al área a cargo.';
  readonly RutaImgs = 'src/assets/';

  constructor(
    private servicioLogin: LoginAccessService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.nombreProyecto = '';
    this.esLoginPublico = true;
    this.vistaPrincipal = '';
    this.usuario = '';
    this.contrasenia = '';
    this.loginLoading = false;
    this.loginMensaje = [];
    this.loginMensaje_severidad = '';
  }

  ngOnInit() {
  }

  /*Cuando el usuario quiere iniciar sesión este método verificará que los datos estén correctos y continuará
  con el flujo si es así.*/
  validar(): void {
    this.servicioLogin.nombreProyecto = this.nombreProyecto;
    this.servicioLogin.esLoginPublico = this.esLoginPublico;
    this.usuario = this.usuario.trim();

    if (this.usuario.length === 5) {
      this.loginLoading = true;
      setTimeout(() => {
        Promise.resolve(this.servicioLogin.getEmpleado(this.usuario))
          .then(respuesta => {
            this.loginLoading = false;
            console.log(respuesta)
            if ((respuesta != null) && (respuesta.password === this.contrasenia)) {
              this.servicioLogin.usuario = respuesta;
              this.usuario = '';
              this.contrasenia = '';
              this.obtenerTodosModulos();
            } else {
              this.mostrarMensajeTemporal(this.Constants.Pgrowl_Error, 'Error', 'Información incorrecta');
            }
          });
      }, 100);
    } else {
      this.mostrarMensajeTemporal(this.Constants.Pgrowl_Error, 'Error', 'RPE no válido');
      this.usuario = '';
      this.contrasenia = '';
    }
  }

  /*Obtiene el arreglo de todos los módulos que tenga el sistema*/
  private obtenerTodosModulos(): void {
    this.servicioLogin.modulosDelSistema = [];
    if ( this.nombreProyecto.length > 0 ) {
      this.loginLoading = true;
      setTimeout(() => {
        Promise.resolve(this.servicioLogin.seleccionarModulosPorProyecto(this.nombreProyecto))
          .then(respuesta => {
            this.loginLoading = false;
            if ( respuesta != null ) {
              this.servicioLogin.modulosDelSistema = respuesta;
            }
            this.obtenerModulosDelUsuario();
          });
      }, 100);
    }
  }

  /*Obtiene el arreglo de todos los módulos que tenga el sistema*/
  private obtenerModulosDelUsuario(): void {
    console.log('entra a obtenermod')
    this.servicioLogin.rolesDelUsuario = [];
    if ( this.nombreProyecto.length > 0 ) {
      this.loginLoading = true;
      setTimeout(() => {
        Promise.resolve(this.servicioLogin.seleccionarRolUsuarioPorProyecto(this.servicioLogin.usuario.rpe, this.nombreProyecto))
          .then(respuesta => {
            this.loginLoading = false;
            if ( respuesta != null ) {
              this.servicioLogin.rolesDelUsuario = respuesta;
            }
            this.validarModulosDelUsuario();
          });
      }, 100);
    }
  }

  private validarModulosDelUsuario(): void {
    // Es un sistema con acceso no-público y el usuario no tiene módulos
    if ( !this.esLoginPublico && (this.servicioLogin.rolesDelUsuario.length === 0) ) {
      this.servicioLogin.logout('');
      this.mostrarMensajeTemporal( this.Constants.Pgrowl_Error, 'Sin acceso', this.msjErrorLoginPrivado );
    } else {
      this.irVistaPrincipal();
    }
  }

  /*Muestra un mensaje temporal para este componente*/
  private mostrarMensajeTemporal( severidad: string, titulo: string, mensaje: string ): void {
    this.loginMensaje_severidad = severidad;
    this.messageService.add({severity: severidad, summary: titulo, detail: mensaje});
  }

  /*Redirige a la vista principal del sistema*/
  private irVistaPrincipal(): void {
    this.servicioLogin.guardarLocalStorage();
    if ( this.vistaPrincipal.length > 0 ) {
      this.mostrarMensajeTemporal(this.Constants.Pgrowl_Succes, 'Bienvenido',
        this.servicioLogin.usuario.nombreCompleto);
      this.router.navigate([this.vistaPrincipal]);
    } else {
      this.mostrarMensajeTemporal( this.Constants.Pgrowl_Error, 'Error', 'El módulo de Login no ha detectado el nombre del proyecto.' );
    }
  }

}
