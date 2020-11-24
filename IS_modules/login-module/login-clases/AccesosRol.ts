/*Creado por D256V 26/04/2018*/
export class AccesosRol {
  private _consacceso: string;
  private _cveproy: string;
  private _cverol: string;
  private _cvemodulo: string;
  private _cvecampo: string;

  constructor(consacceso: string, cveproy: string, cverol: string, cvemodulo: string, cvecampo: string) {
    this._consacceso = consacceso;
    this._cveproy = cveproy;
    this._cverol = cverol;
    this._cvemodulo = cvemodulo;
    this._cvecampo = cvecampo;
  }

  get consacceso(): string {
    return this._consacceso;
  }

  set consacceso(value: string) {
    this._consacceso = value;
  }

  get cveproy(): string {
    return this._cveproy;
  }

  set cveproy(value: string) {
    this._cveproy = value;
  }

  get cverol(): string {
    return this._cverol;
  }

  set cverol(value: string) {
    this._cverol = value;
  }

  get cvemodulo(): string {
    return this._cvemodulo;
  }

  set cvemodulo(value: string) {
    this._cvemodulo = value;
  }

  get cvecampo(): string {
    return this._cvecampo;
  }

  set cvecampo(value: string) {
    this._cvecampo = value;
  }
}
