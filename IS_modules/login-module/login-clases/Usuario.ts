/*Creado por D256V 24/04/2018*/
import {AreaTrabajo} from './area-trabajo';

export class Usuario {
  private _nip: string;
  private _rpe: string;
  private _nombreCompleto: string;
  private _nombre: string;
  private _apellidomaterno: string;
  private _apellidopaterno: string;
  private _sexo: string;
  private _fechaNacimiento: string;
  private _contrato: string;
  private _emailLotus: string;
  private _emailInterno: string;
  private _perfil: string;
  private _compania: string;
  private _rpeanterior: string;
  private _domicilio: string;
  private _telefono: string;
  private _extension: string;
  private _celular: string;
  private _vigente: string;
  private _areaTrabajo: AreaTrabajo;
  private _foto: any[];

  get nip(): string {
    return this._nip;
  }

  set nip(value: string) {
    this._nip = value;
  }

  get rpe(): string {
    return this._rpe;
  }

  set rpe(value: string) {
    this._rpe = value;
  }

  get nombreCompleto(): string {
    return this._nombreCompleto;
  }

  set nombreCompleto(value: string) {
    this._nombreCompleto = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get apellidomaterno(): string {
    return this._apellidomaterno;
  }

  set apellidomaterno(value: string) {
    this._apellidomaterno = value;
  }

  get apellidopaterno(): string {
    return this._apellidopaterno;
  }

  set apellidopaterno(value: string) {
    this._apellidopaterno = value;
  }

  get sexo(): string {
    return this._sexo;
  }

  set sexo(value: string) {
    this._sexo = value;
  }

  get fechaNacimiento(): string {
    return this._fechaNacimiento;
  }

  set fechaNacimiento(value: string) {
    this._fechaNacimiento = value;
  }

  get contrato(): string {
    return this._contrato;
  }

  set contrato(value: string) {
    this._contrato = value;
  }

  get emailLotus(): string {
    return this._emailLotus;
  }

  set emailLotus(value: string) {
    this._emailLotus = value;
  }

  get emailInterno(): string {
    return this._emailInterno;
  }

  set emailInterno(value: string) {
    this._emailInterno = value;
  }

  get perfil(): string {
    return this._perfil;
  }

  set perfil(value: string) {
    this._perfil = value;
  }

  get compania(): string {
    return this._compania;
  }

  set compania(value: string) {
    this._compania = value;
  }

  get rpeanterior(): string {
    return this._rpeanterior;
  }

  set rpeanterior(value: string) {
    this._rpeanterior = value;
  }

  get domicilio(): string {
    return this._domicilio;
  }

  set domicilio(value: string) {
    this._domicilio = value;
  }

  get telefono(): string {
    return this._telefono;
  }

  set telefono(value: string) {
    this._telefono = value;
  }

  get extension(): string {
    return this._extension;
  }

  set extension(value: string) {
    this._extension = value;
  }

  get celular(): string {
    return this._celular;
  }

  set celular(value: string) {
    this._celular = value;
  }

  get vigente(): string {
    return this._vigente;
  }

  set vigente(value: string) {
    this._vigente = value;
  }

  get areaTrabajo(): AreaTrabajo {
    return this._areaTrabajo;
  }

  set areaTrabajo(value: AreaTrabajo) {
    this._areaTrabajo = value;
  }

  get foto(): any[] {
    return this._foto;
  }

  set foto(value: any[]) {
    this._foto = value;
  }
}
