export class PropiedadesOpcionales {
  private _title: string;
  private _description: string;
  private _proyecto: string;
  private _usuario: string;
  private _unidad: string;
  private _esc: string;
  private _esc2: string;
  private _urlProy: string;

  constructor() {
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get proyecto(): string {
    return this._proyecto;
  }

  set proyecto(value: string) {
    this._proyecto = value;
  }

  get usuario(): string {
    return this._usuario;
  }

  set usuario(value: string) {
    this._usuario = value;
  }

  get unidad(): string {
    return this._unidad;
  }

  set unidad(value: string) {
    this._unidad = value;
  }

  get esc(): string {
    return this._esc;
  }

  set esc(value: string) {
    this._esc = value;
  }

  get esc2(): string {
    return this._esc2;
  }

  set esc2(value: string) {
    this._esc2 = value;
  }

  get urlProy(): string {
    return this._urlProy;
  }

  set urlProy(value: string) {
    this._urlProy = value;
  }
}
