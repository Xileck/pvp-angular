/*Creado por D256V 26/04/2018*/
export class Proy {
  private _cveproy: string;
  private _descproy: string;

  constructor(cveproy: string, descproy: string) {
    this._cveproy = cveproy;
    this._descproy = descproy;
  }

  get cveproy(): string {
    return this._cveproy;
  }

  set cveproy(value: string) {
    this._cveproy = value;
  }

  get descproy(): string {
    return this._descproy;
  }

  set descproy(value: string) {
    this._descproy = value;
  }
}
