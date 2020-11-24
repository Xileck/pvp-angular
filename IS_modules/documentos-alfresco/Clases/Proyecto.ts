import {Node} from './Node';

/**
 * Created by D314V on 13/06/2018.
 */
export class Proyecto extends Node {
  private _proyecto: string;
  private _usuario: string;
  private _unidad: string;
  private _llave: string;
  private _esc: string;
  private _esc2: string;
  private _llaveConsec: string;
  private _urlProy: string;
  private _contenido: string;

  constructor() {
    super();
    this._proyecto = '';
    this._usuario = '';
    this._unidad = '';
    this._llave = '';
    this._esc = '';
    this._esc2 = '';
    this._llaveConsec = '';
    this._urlProy = '';
    this._contenido = '';
  }

  /*constructor(DocumentoObj: any = null) {
    super(DocumentoObj);
    if (DocumentoObj !== undefined && DocumentoObj != null) {
      this.proyecto = DocumentoObj.proyecto;
      this.usuario = DocumentoObj.usuario;
      this.unidad = DocumentoObj.unidad;
      this.llaveCarpetaAlfresco = DocumentoObj.llaveCarpetaAlfresco;
      this.esc = DocumentoObj.esc;
      this.esc2 = DocumentoObj.esc2;
      this.llaveConsec = DocumentoObj.llaveConsec;
      this.urlProy = DocumentoObj.urlProy;
      this.contenido = DocumentoObj.contenido;
    }
  }*/

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

  get llave(): string {
    return this._llave;
  }

  set llave(value: string) {
    this._llave = value;
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

  get llaveConsec(): string {
    return this._llaveConsec;
  }

  set llaveConsec(value: string) {
    this._llaveConsec = value;
  }

  get urlProy(): string {
    return this._urlProy;
  }

  set urlProy(value: string) {
    this._urlProy = value;
  }

  get contenido(): string {
    return this._contenido;
  }

  set contenido(value: string) {
    this._contenido = value;
  }
}
