/*Creado por D256V 24/04/2018*/
import {RolUsuario} from './Rol-usuario';

export class Permisos {
  private _cve_rol: string;
  private _roles: RolUsuario[];

  constructor(cve_rol: string, roles: RolUsuario[]) {
    this._cve_rol = cve_rol;
    this._roles = roles;
  }

  get cve_rol(): string {
    return this._cve_rol;
  }

  set cve_rol(value: string) {
    this._cve_rol = value;
  }

  get roles(): RolUsuario[] {
    return this._roles;
  }

  set roles(value: RolUsuario[]) {
    this._roles = value;
  }
}
