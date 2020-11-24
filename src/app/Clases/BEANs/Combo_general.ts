export class Combo_general {
  private _clave;
  private _descripcion;
  private _descripcionBreve;

  constructor(clave, descripcion, descripcionBreve) {
    this._clave = clave;
    this._descripcion = descripcion;
    this._descripcionBreve = descripcionBreve;
  }


  get clave() {
    return this._clave;
  }

  set clave(value) {
    this._clave = value;
  }

  get descripcion() {
    return this._descripcion;
  }

  set descripcion(value) {
    this._descripcion = value;
  }

  get descripcionBreve() {
    return this._descripcionBreve;
  }

  set descripcionBreve(value) {
    this._descripcionBreve = value;
  }
}
