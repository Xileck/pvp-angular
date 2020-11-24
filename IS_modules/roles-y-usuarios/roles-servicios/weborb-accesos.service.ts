import { Injectable } from '@angular/core';
import {Modulo} from '../roles-clases/Modulo';
import {Rol} from '../roles-clases/Rol';
import {AccesosRol} from '../roles-clases/AccesosRol';
import {RolUsuario} from '../roles-clases/RolUsuario';
import {environment} from '../../../src/environments/environment';
import {Proyecto} from '../roles-clases/Proyecto';

@Injectable()
export class WeborbAccesosService {
  readonly ModulosBO = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.ModulosBO', environment.ruta, null, null);
  readonly RolesBO = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.RolesBO', environment.ruta, null, null);
  readonly AccesosRolBO = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.AccesosRolBO', environment.ruta, null, null);
  readonly Rol_usuarioBO = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.Rol_usuarioBO', environment.ruta, null, null);

  constructor() { }

  public seleccionarModulosPorProyecto(cveproy: string): Modulo[] {
    return this.ModulosBO.seleccionarModulosPorProyecto(cveproy);
  }

  public seleccionarModulosPorRol(cverol: string, cveproy: string): Modulo[] {
    return this.ModulosBO.seleccionarModulosPorRol(cverol, cveproy);
  }

  public seleccionarModulo(cveproy: string, cvemodulo: string): Modulo {
    return this.ModulosBO.seleccionarModulo(cveproy, cvemodulo);
  }

  public guardarModulo(modulo: Modulo): number {
    return this.ModulosBO.guardarModulo(null, modulo);
  }

  public borrarModulo(cveproy: string, cvemodulo: string): number {
    return this.ModulosBO.eliminarModulo(null, cveproy, cvemodulo);
  }

  public seleccionarRolesPorProyecto(cveproy: string): Rol[] {
    return this.RolesBO.seleccionarRolesPorProyecto(cveproy);
  }

  public insertarRol(rol: Rol): number {
    return this.RolesBO.insertarRol(rol);
  }

  public insertarAccesosRolPorProyecto(accesos: AccesosRol[], cveproy: string, cverol: string): number {
    return this.AccesosRolBO.insertarAccesosRolPorProyecto(accesos, cveproy, cverol);
  }

  public seleccionarTodosRolUsuario(cveproy: string): RolUsuario[] {
    return this.Rol_usuarioBO.seleccionarTodosRolUsuario(cveproy);
  }

  public guardarRolUsuario(rol_usuario: RolUsuario): number {
    return this.Rol_usuarioBO.guardarRolUsuario(rol_usuario);
  }

  public eliminarRolUsuario(cveproy: string, cveusuario: string, cverol: string): number {
    return this.Rol_usuarioBO.eliminarRolUsuario(cveproy, cveusuario, cverol);
  }

  public buscarProyecto(cveproy: string): any {
    const ProyBO = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.ProyBO', environment.ruta, null, null);
    return ProyBO.seleccionarProy(cveproy);
  }

  public guardarProyecto(proyecto: Proyecto): number {
    const ProyBO = webORB.bind('com.cfemex.lv.dis.apps.accesos.negocio.ProyBO', environment.ruta, null, null);
    return ProyBO.insertarProyecto(proyecto);
  }
}
