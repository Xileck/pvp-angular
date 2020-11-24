export class UbicacionTec {
  private _ubicacion;
  private _unidad;
  private _cvesistema;
  private _cvecomp;
  private _consectag;


  constructor(ubicacion, unidad, cvesistema, cvecomp, consectag) {
    this._ubicacion = ubicacion;
    this._unidad = unidad;
    this._cvesistema = cvesistema;
    this._cvecomp = cvecomp;
    this._consectag = consectag;
  }

  get ubicacion() {
    return this._ubicacion;
  }

  set ubicacion(value) {
    this._ubicacion = value;
  }

  get unidad() {
    return this._unidad;
  }

  set unidad(value) {
    this._unidad = value;
  }

  get cvesistema() {
    return this._cvesistema;
  }

  set cvesistema(value) {
    this._cvesistema = value;
  }

  get cvecomp() {
    return this._cvecomp;
  }

  set cvecomp(value) {
    this._cvecomp = value;
  }

  get consectag() {
    return this._consectag;
  }

  set consectag(value) {
    this._consectag = value;
  }
}
