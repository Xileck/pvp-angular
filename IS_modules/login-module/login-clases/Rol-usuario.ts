/*Creado por D256V 24/04/2018*/
import {AccesosRol} from './AccesosRol';

export class RolUsuario {
  private _cve_usuario: string;
  private _cve_proy: string;
  private _cve_areagpo: string;
  private _cve_rol: string;
  private _nip: string;
  private _password: string;
  private _permisos: string;
  private _nipSuplente: string;
  private _accesos: AccesosRol[];
  private _descrol: string;

  constructor(cve_usuario: string, cve_proy: string, cve_areagpo: string, cve_rol: string, nip: string, password: string, permisos: string, nipSuplente: string, accesos: AccesosRol[], descrol: string) {
    this._cve_usuario = cve_usuario;
    this._cve_proy = cve_proy;
    this._cve_areagpo = cve_areagpo;
    this._cve_rol = cve_rol;
    this._nip = nip;
    this._password = password;
    this._permisos = permisos;
    this._nipSuplente = nipSuplente;
    this._accesos = accesos;
    this._descrol = descrol;
  }

  get cve_usuario(): string {
    return this._cve_usuario;
  }

  set cve_usuario(value: string) {
    this._cve_usuario = value;
  }

  get cve_proy(): string {
    return this._cve_proy;
  }

  set cve_proy(value: string) {
    this._cve_proy = value;
  }

  get cve_areagpo(): string {
    return this._cve_areagpo;
  }

  set cve_areagpo(value: string) {
    this._cve_areagpo = value;
  }

  get cve_rol(): string {
    return this._cve_rol;
  }

  set cve_rol(value: string) {
    this._cve_rol = value;
  }

  get nip(): string {
    return this._nip;
  }

  set nip(value: string) {
    this._nip = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get permisos(): string {
    return this._permisos;
  }

  set permisos(value: string) {
    this._permisos = value;
  }

  get nipSuplente(): string {
    return this._nipSuplente;
  }

  set nipSuplente(value: string) {
    this._nipSuplente = value;
  }

  get accesos(): AccesosRol[] {
    return this._accesos;
  }

  set accesos(value: AccesosRol[]) {
    this._accesos = (value != null)? value : [];
  }

  get descrol(): string {
    return this._descrol;
  }

  set descrol(value: string) {
    this._descrol = value;
  }
}
