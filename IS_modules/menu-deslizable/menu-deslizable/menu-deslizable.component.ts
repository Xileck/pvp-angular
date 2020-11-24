import { ServiciosGeneralesService } from './../../../src/app/servicios/servicios-generales.service';
import { Constants } from './../../../src/app/Clases/utils/Constants';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Modulos } from '../../../IS_modules/login-module/login-clases/Modulos';
import { Router } from '@angular/router';
import { LoginAccessService } from '../../login-module/login-access.service';

@Component({
  selector: 'app-menu-deslizable',
  templateUrl: './menu-deslizable.component.html',
  styleUrls: ['./menu-deslizable.component.css']
})
export class MenuDeslizableComponent implements OnInit {

  readonly Constants: Constants = Constants;
  /*Variables*/
  @Input() desplegarSubmodulos: boolean;
  @Input() mostrarMenu: boolean;
  @Output() mostrarMenuSalida: EventEmitter<boolean> = new EventEmitter();
  @Input() vistaActual: string;
  @Input() vistaLogin: string;
  rolesDelUsuario: string;
  /*Constantes*/
  private readonly EstiloOpcionHija = 'opcion-hija';
  private readonly EstiloOpcionSeleccionada = 'slideMenu-nav-item-o';

  menuItems: Array<any> = []

  constructor(private router: Router, public servicioLogin: LoginAccessService, private servicioGeneral:ServiciosGeneralesService) {
    this.desplegarSubmodulos = true;
    this.mostrarMenu = false;
    this.rolesDelUsuario = '';
    this.vistaActual = '';
    this.vistaLogin = 'Inicio';
  }

  ngOnInit() {
    this.obtenerRolesDelUsuario()
    this.obtenerMenuItems();
  }


  private obtenerRolesDelUsuario(): void {
    const descRoles: string[] = [];
    const roles = this.servicioLogin.rolesDelUsuario;
    console.log(roles)
    if (roles.length > 0) {
      for (const rol of roles) {
        descRoles.push(rol.descrol);
      }
    } else {
      descRoles.push('INVITADO');
    }
    console.log(this.servicioLogin.usuario)
    this.rolesDelUsuario = descRoles.join(', ');
  }

  private obtenerMenuItems(): void {
    this.menuItems.push({ icon: 'fa-lock', label: 'Accesos Rev Documental', vista: Constants.VistaInicio })
    this.menuItems.push({ icon: 'fa-users', label: 'Usuarios', vista: Constants.VistaUsuarios })
  }

  /*Convierte una imagen en Byte[] a algo que puede leer el navegador*/
  convertArrayBytesToBase64(byte: any): string {
    let binary = '';
    const bytes = new Uint8Array(byte);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  obtenerEstilos(vista: Modulos): string[] {
    let estilos: string[] = [];
    const posmoduloChars = vista.posmodulo.trim().split('');
    if (posmoduloChars.length > 1 && (vista.posmodulo.indexOf('.') >= 0 || posmoduloChars[3] !== '0')) {
      estilos.push(this.EstiloOpcionHija);
    }
    if (vista.descmodulo.trim() === this.vistaActual) {
      estilos.push(this.EstiloOpcionSeleccionada);
    }

    return estilos;
  }

  opcionClic(vistaClic: Modulos): void {
    // Si el menú abierto entonces hay que cerrarlo
    if (this.mostrarMenu) {
      this.ocultarSidebar();
    }
    // Redirige a la vista que indique el parámetro
    const SiguienteVista = (vistaClic.rutaapps != null) ? vistaClic.rutaapps : vistaClic.descmodulo;
    this.router.navigate([SiguienteVista]);
  }

  ocultarSidebar(): void {
    this.servicioGeneral.displaySlideMenu = false;
    //this.mostrarMenuSalida.emit(this.mostrarMenu);
  }

  test(){
    console.log(this.servicioLogin.usuario)
    console.log(this.servicioLogin.rolesDelUsuario[0].descrol)
  }
}
