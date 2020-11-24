export class Node {
  private _id: string;
  private _name: string;
  private _title: string;
  private _description: string;
  private _creator: string;
  private _createdDate: string;
  private _modifier: string;
  private _modifiedDate: string;
  private _contentType: string;
  private _contentUrl: string;
  private _size: string;
  private _path: string;
  private _createdDateTipoDate: Date;

  constructor() {
    this._id = '';
    this._name = '';
    this._title = '';
    this._description = '';
    this._creator = '';
    this._createdDate = '';
    this._modifier = '';
    this._modifiedDate = '';
    this._contentType = '';
    this._contentUrl = '';
    this._size = '';
    this._path = '';
    this._createdDateTipoDate = null;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

  get creator(): string {
    return this._creator;
  }

  set creator(value: string) {
    this._creator = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get modifier(): string {
    return this._modifier;
  }

  set modifier(value: string) {
    this._modifier = value;
  }

  get modifiedDate(): string {
    return this._modifiedDate;
  }

  set modifiedDate(value: string) {
    this._modifiedDate = value;
  }

  get contentType(): string {
    return this._contentType;
  }

  set contentType(value: string) {
    this._contentType = value;
  }

  get contentUrl(): string {
    return this._contentUrl;
  }

  set contentUrl(value: string) {
    this._contentUrl = value;
  }

  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }

  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get createdDateTipoDate(): Date {
    return this._createdDateTipoDate;
  }

  set createdDateTipoDate(value: Date) {
    this._createdDateTipoDate = value;
  }
}
